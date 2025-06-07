import { geoSearch } from "@/utils/opencage/queries/geoSearch";
import { useQuery } from "@tanstack/react-query";
import {
  useCallback,
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
import type { SearchOpenCageResult } from "@/utils/types";
import { useGeolocation } from "@/hooks/useGeolocation";
import { cn } from "@/lib/utils";

export default function SearchInput() {
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
    if (!value) setOpen(false);
    else setOpen(true);
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
    <div className="relative mt-8 sm:mt-14 w-full sm:w-96 flex m-auto items-center">
      <div className="w-full sm:w-96 rounded-full bg-white absolute h-full opacity-60" />
      <Input
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

      <div
        className={cn("absolute transition-all w-full top-[40px]", {
          "opacity-0 invisible": !open,
        })}
      >
        <div className="rounded left-0 bottom-0 right-0 top-0 w-full z-0 bg-white opacity-60 absolute" />
        <ul className="z-10 rounded text-sm font-light relative w-full sm:w-96">
          {hasResults ? (
            data?.results.map((place, index) => (
              <li
                onClick={handleSelect(place)}
                key={index}
                className="hover:bg-gray-300 p-2 cursor-pointer rounded"
              >
                {place.formatted}
              </li>
            ))
          ) : (
            <li className="hover:bg-gray-300 p-2 cursor-pointer rounded">
              {isFetching ? "..." : "No results."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
