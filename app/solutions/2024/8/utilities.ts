import type { Coordinates, Map } from "./types";

type CheckFn = (map: Map, coordinate: Coordinates) => boolean;

export const isWithinBounds: CheckFn = (map, coordinate) => {
  return coordinate.x >= 0 && coordinate.x < map.cols
    && coordinate.y >= 0 && coordinate.y < map.rows;
};

type RemoveFn = (nodes: Array<Coordinates>) => Array<Coordinates>;

export const removeDuplicates: RemoveFn = (nodes) => {
  const keys = new Set<string>();
  const unique: Array<Coordinates> = [];

  for (const node of nodes) {
    const key = `${node.x},${node.y}`;
    if (keys.has(key)) { continue; }

    keys.add(key);
    unique.push(node);
  }

  return unique;
};