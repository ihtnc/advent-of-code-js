import { SymbolType, type Coordinates } from "./types";

type CreateFn = (width: number, height: number, start: Coordinates, end: Coordinates) => Array<Array<SymbolType>>;

export const createMap: CreateFn = (width, height, start, end) => {
  if (width <= 0 || height <= 0) { return [[]]; }
  if (start.x < 0 || start.y < 0 || start.x >= width || start.y >= height) { return [[]]; }
  if (end.x < 0 || end.y < 0 || end.x >= width || end.y >= height) { return [[]]; }
  if (start.x === end.x && start.y === end.y) { return [[]]; }

  const map = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => SymbolType.EMPTY)
  );

  map[start.y][start.x] = SymbolType.START;
  map[end.y][end.x] = SymbolType.END;

  return map;
};

type CopyFn = (map: Array<Array<SymbolType>>) => Array<Array<SymbolType>>;

export const copyMap: CopyFn = (map) => map.map(row => [...row]);