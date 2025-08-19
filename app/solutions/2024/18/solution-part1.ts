import { SymbolType, type Location, type Coordinates, type InputData, type Options, type PathNode } from './types';
import { copyMap } from './utilities';

type Fn = ({ coordinates }: InputData, options: Options) => Promise<number>;

const solution: Fn = async ({ coordinates }, options) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const { map: data, start, end, batchSize } = options;
      const copy = copyMap(data);

      const walls = coordinates.slice(0, batchSize);
      addWalls(copy, walls);

      const map = convert(copy);
      removeDeadEnds(map);

      const startLocation = map[start.y][start.x];
      const endLocation = map[end.y][end.x];
      const path = getOptimalPath(startLocation, endLocation);

      // exclude the start from the final count
      resolve(path.length - 1);
    });
  });

  return promise;
};

type AddFn = (map: Array<Array<SymbolType>>, coordinates: Array<Coordinates>) => void;

const addWalls: AddFn = (map, coordinates) => {
  coordinates.forEach(({ x, y }) => {
    if (map[y] && map[y][x] === SymbolType.EMPTY) {
      map[y][x] = SymbolType.WALL;
    }
  });
};

type ConvertFn = (map: Array<Array<SymbolType>>) => Array<Array<Location>>;

const convert: ConvertFn = (map) =>  {
  const newMap: Array<Array<Location>> = [];
  let previousLine: Array<Location> = [];

  for (let y = 0; y < map.length; y++) {
    const line = map[y];
    const newLine: Array<Location> = [];
    for (let x = 0; x < line.length; x++) {
      const symbol = line[x];

      let top: Location | undefined;
      if (previousLine.length === line.length) {
        top = previousLine[x];
      }

      let left: Location | undefined;
      if (x > 0) {
        left = newLine[x - 1];
      }

      const path: Location = {
        coordinates: { x, y },
        symbol,
        connections: []
      };

      if (symbol !== SymbolType.WALL && top && top.symbol !== SymbolType.WALL) {
        path.connections.push(top);
        top.connections.push(path);
      }

      if (symbol !== SymbolType.WALL && left && left.symbol !== SymbolType.WALL) {
        path.connections.push(left);
        left.connections.push(path);
      }

      newLine.push(path);
    }

    if (newLine.length === 0) { continue; }

    newMap.push(newLine);
    previousLine = newLine;
  }

  return newMap;
};

type RemoveFn = (map: Array<Array<Location>>) => void;

const removeDeadEnds: RemoveFn = (map) => {
  const paths = new Set<Location>();
  for (const line of map) {
    for (const path of line) {
      if (path.symbol === SymbolType.WALL) { continue; }
      paths.add(path);
    }
  }

  const queue: Array<Location> = [];

  // get initial deadends
  for (const path of paths) {
    if (path.symbol !== SymbolType.EMPTY) { continue; }

    if (path.connections.length === 1) {
      queue.push(path);
    }
  }

  // remove items from the list
  // remove connections to these items
  // find new deadends if any
  while (queue.length > 0) {
    const path = queue.shift();
    if (!path) { continue; }
    paths.delete(path);

    for (const next of path.connections) {
      const toRemove = next.connections.findIndex((c) => c === path);
      if (toRemove < 0) { continue; }

      next.connections.splice(toRemove, 1);
      if (next.symbol === SymbolType.EMPTY
        && next.connections.length === 1) {
        queue.push(next);
      }
    }
  }
};

type GetOptimalPathFn = (start: Location, end: Location) => Array<Coordinates>;

const getOptimalPath: GetOptimalPathFn = (start, end) => {
  const available = new Set<PathNode>();
  const visited = new Set<Location>();
  const cache = new Map<Location, PathNode>();

  const startNode: PathNode = {
    location: start,
    step: 0,
    weightedStep: getWeight(start.coordinates, end.coordinates),
    parent: null
  };

  available.add(startNode);
  cache.set(startNode.location, startNode);

  while (available.size > 0) {
    const current = getNext(available);
    if (current === null) { break; }

    if (current.location === end) {
      const steps = traceSteps(current);
      return steps;
    }

    available.delete(current);
    visited.add(current.location);

    for (const neighbor of current.location.connections) {
      if (visited.has(neighbor)) { continue; }

      const nextStep = current.step + 1;

      let node = cache.get(neighbor);
      if (!node) {
        node = {
          location: neighbor,
          step: Infinity,
          weightedStep: Infinity,
          parent: null
        };
        cache.set(neighbor, node);
      }

      if (nextStep < node.step) {
        node.parent = current;
        node.step = nextStep;
        node.weightedStep = nextStep + getWeight(neighbor.coordinates, end.coordinates);

        if (!available.has(node)) { available.add(node); }
      }
    }
  }

  return [];
};

type TraceStepsFn = (end: PathNode) => Array<Coordinates>;

const traceSteps: TraceStepsFn = (end) => {
  const path: Array<Coordinates> = [];
  let current: PathNode | null = end;
  while (current) {
    path.unshift(current.location.coordinates);
    current = current.parent;
  }
  return path;
};

type GetNextFn = (paths: Set<PathNode>) => PathNode | null;

const getNext: GetNextFn = (paths) => {
  let current: PathNode | null = null;
  for (const node of paths) {
    if (!current || node.weightedStep < current.weightedStep) {
      current = node;
    }
  }
  return current;
};

type GetWeightFn = (from: Coordinates, to: Coordinates) => number;

const getWeight: GetWeightFn = (from, to) => {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
};

export { solution, addWalls, convert, removeDeadEnds, getOptimalPath };