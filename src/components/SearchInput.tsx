import { geoSearch } from "@/utils/opencage/queries/geoSearch";
import { useQuery } from "@tanstack/react-query";
import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import debounce from "lodash.debounce";
import { Input } from "./ui/input";
import {
  AiOutlineSearch,
  AiOutlineLoading,
  AiOutlineClose,
} from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SearchOpenCageResult } from "@/utils/types";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setLocation } = useGeolocation();

  const [inputSearchText, setInputSearchText] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { data, isFetching } = useQuery({
    queryKey: ["geoSearch", searchText],
    queryFn: () => geoSearch(searchText ?? ""),
    enabled: !!(searchText && searchText?.length >= 3),
  });

  const hasResults = data && data?.results.length > 0;

  const handleSetSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 1000),
    []
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputSearchText(value);
    handleSetSearch(value);
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (place: SearchOpenCageResult) => () => {
    setInputSearchText(place.formatted);
    setSearchText(place.formatted);
    setOpen(false);
    if (place.geometry) {
      setLocation({
        latitude: place.geometry.lat,
        longitude: place.geometry.lng,
      });
    }
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputSearchText(null);
    setSearchText(null);
    setOpen(false);
  };

  return (
    <div className="flex justify-center mt-14">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          onClick={(e) => {
            e.preventDefault();
            if (data?.results) setOpen(true);
          }}
        >
          <div className="relative w-full sm:w-96 flex items-center">
            <div className="w-full sm:w-96 rounded-full bg-white absolute h-full opacity-60" />
            <Input
              ref={inputRef}
              value={inputSearchText ?? ""}
              type="text"
              placeholder="Search City..."
              className="!ring-0 border-none z-10"
              onChange={onChange}
            />
            {hasResults && (
              <button
                onClick={handleReset}
                className="!bg-transparent cursor-pointer mr-1 z-10"
              >
                <AiOutlineClose className="w-5 h-5 text-red-600" />
              </button>
            )}
            <div className="bg-gray-600 p-1 rounded-full mr-1 z-10">
              {isFetching ? (
                <AiOutlineLoading className="animate-spin text-white" />
              ) : (
                <AiOutlineSearch size={20} className="text-white" />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full border-0 p-0">
          <div className="rounded left-0 bottom-0 right-0 top-0 w-full z-0 bg-white opacity-60 absolute" />
          <ul className="z-10 text-sm font-light relative w-full max-w-[300px] sm:w-96">
            {hasResults ? (
              data?.results.map((place, index) => (
                <li
                  onClick={handleSelect(place)}
                  key={index}
                  className="hover:bg-gray-300 p-2 cursor-pointer"
                >
                  {place.formatted}
                </li>
              ))
            ) : (
              <li className="hover:bg-gray-300 p-2 cursor-pointer">
                No results.
              </li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
