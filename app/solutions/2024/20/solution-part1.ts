import { SymbolType, type Coordinates, type InputData, type Location } from './types';

type Fn = ({ map }: InputData, minimumTimeSavings: number) => Promise<number>;

const solution: Fn = async ({ map: data }, minimumTimeSavings) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const map = convert(data);

      const start = findLocation(map, SymbolType.START);
      if (start === undefined) { return resolve(0); }

      const end = findLocation(map, SymbolType.END);
      if (end === undefined) { return resolve(0); }

      const path = traversePath(start, end);
      const pathTrace = new Map<Coordinates, number>();
      path.forEach((coordinates, index) => { pathTrace.set(coordinates, index); });

      let wallCount: number = 0;
      const walls = findRemoveableWalls(map);
      for (const wall of walls) {
        const timeSavings = calculateTimeSavings(wall, pathTrace);
        if (timeSavings >= minimumTimeSavings) {
          wallCount++;
        }
      }
      return resolve(wallCount);
    });
  });

  return promise;
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

      if (top) {
        path.connections.push(top);
        top.connections.push(path);
      }

      if (left) {
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

type FindWallsFn = (map: Array<Array<Location>>) => Array<Location>;

const findRemoveableWalls: FindWallsFn = (map) => {
  const walls: Array<Location> = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      // ignore non-wall locations
      if (map[y][x].symbol !== SymbolType.WALL) { continue; }

      const connections = map[y][x].connections.filter(c => c.symbol !== SymbolType.WALL);

      // ignore walls that have:
      //   less than 2 empty locations on any side (not bypassable)
      //   greater than 2 empty locations on any side (u-turns)
      if (connections.length !== 2) { continue; }

      // ignore corner walls
      // empty locations should line up horizontally or vertically
      const [empty1, empty2] = connections;
      if (empty1.coordinates.x !== empty2.coordinates.x
        && empty1.coordinates.y !== empty2.coordinates.y) {
        continue;
      }

      walls.push(map[y][x]);
    }
  }
  return walls;
};

type CalculateFn = (wall: Location, pathTrace: Map<Coordinates, number>) => number;

const calculateTimeSavings: CalculateFn = (wall, pathTrace) => {
  if (wall.symbol !== SymbolType.WALL) { return 0; }

  const empty = wall.connections.filter(c => c.symbol !== SymbolType.WALL);
  if (empty.length !== 2) { return 0; }

  const [empty1, empty2] = empty;
  const index1 = pathTrace.get(empty1.coordinates);
  if (!index1) { return 0; }

  const index2 = pathTrace.get(empty2.coordinates);
  if (!index2) { return 0; }

  const distance = Math.abs(index1 - index2);

  // account for time to step through wall
  return distance - 2;
};

type FindFn = (map: Array<Array<Location>>, symbol: SymbolType) => Location | undefined;

const findLocation: FindFn = (map, symbol) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].symbol === symbol) { return map[y][x]; }
    }
  }
  return undefined;
};

type TraverseFn = (start: Location, end: Location) => Array<Coordinates>;

const traversePath: TraverseFn = (start, end) => {
  const path: Array<Coordinates> = [start.coordinates];
  const visited: Set<Location> = new Set();
  visited.add(start);

  let next = start.connections.find(c =>
    c.symbol !== SymbolType.WALL && !visited.has(c)
  );

  while (next !== undefined) {
    path.push(next.coordinates);
    visited.add(next);

    next = next.connections.find(c =>
      c.symbol !== SymbolType.WALL && !visited.has(c)
    );

    if (next?.symbol === SymbolType.END) { break; }
  }

  path.push(end.coordinates);

  return path;
};

export { solution, convert, findLocation, traversePath };