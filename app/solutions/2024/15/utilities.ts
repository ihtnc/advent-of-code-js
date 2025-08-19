import { SymbolType, type Coordinates } from "./types";

type CopyFn = (map: Array<Array<SymbolType>>) => Array<Array<SymbolType>>;

export const copyMap: CopyFn = (map) => {
  return map.map((row) => row.slice());
};

type ValidateFn = (initial: Coordinates, map: Array<Array<SymbolType>>) => boolean;

export const isValidCoordinate: ValidateFn = (initial, map) => {
  const { x, y } = initial;
  if (y < 0 || y >= map.length) { return false; }
  if (x < 0 || x >= map[y].length) { return false; }
  return true;
}