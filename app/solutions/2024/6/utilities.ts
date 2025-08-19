import { Marker } from "./types";

type CopyFn = (map: Array<Array<Marker>>) => Array<Array<Marker>>;

export const copyMap: CopyFn = (map) => {
  const newMap: Array<Array<Marker>> = [];
  for (const row of map) {
    newMap.push([...row]);
  }

  return newMap;
};