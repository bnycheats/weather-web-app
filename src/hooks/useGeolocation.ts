import { LocationContext, type LocationContextValue } from "@/context/location";
import { useContext } from "react";

export const useGeolocation = (): LocationContextValue => {
  return useContext(LocationContext);
};
