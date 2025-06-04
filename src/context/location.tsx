import { reverseGeocode } from "@/utils/opencage/queries/reverseGeocode";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export const LocationContext = createContext<LocationContextValue>({
  setLocation: () => {},
  city: undefined,
  country: undefined,
  location: null,
  error: null,
});

export function LocationProvider(props: PropsWithChildren) {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<GeolocationPositionError | Error | null>(
    null
  );

  const { data: place } = useQuery({
    queryKey: ["place", location?.latitude, location?.longitude],
    queryFn: () => reverseGeocode(location?.latitude, location?.longitude),
    staleTime: 60 * 60 * 1000,
    enabled: !!(location?.latitude && location?.longitude),
  });

  const init = () => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation is not supported."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => setError(err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(init, []);

  return (
    <LocationContext.Provider
      value={{
        setLocation,
        city: place?.results[0]?.components?.city,
        country: place?.results[0]?.components?.country,
        location,
        error,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
}

type Location = {
  latitude: number;
  longitude: number;
};

export type LocationContextValue = {
  location: Location | null;
  city?: string;
  country?: string;
  error: GeolocationPositionError | Error | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
};
