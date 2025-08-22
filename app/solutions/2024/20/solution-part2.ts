import { convert, findLocation, traversePath } from './solution-part1';
import { SymbolType, type Coordinates, type InputData, type Location } from './types';

type Fn = ({ map }: InputData, minimumTimeSavings: number) => Promise<number>;

const solution: Fn = async ({ map: data }, minimumTimeSavings) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const map = convert(data);

      // check part 1 for findLocation definition
      const start = findLocation(map, SymbolType.START);
      if (start === undefined) { return resolve(0); }

      // check part 1 for findLocation definition
      const end = findLocation(map, SymbolType.END);
      if (end === undefined) { return resolve(0); }

      // check part 1 for traversePath definition
      const path = traversePath(start, end);
      const pathTrace = new Map<Coordinates, number>();
      path.forEach((coordinates, index) => { pathTrace.set(coordinates, index); });

      const radius = 20;
      let optimalTimeSavings = 0;
      for (const coordinates of pathTrace.keys()) {
        const location = map[coordinates.y][coordinates.x];
        if (location.symbol === SymbolType.WALL) { continue; }

        const timeSavings = findTimeSavings(location, radius, pathTrace);
        for (const savings of timeSavings.values()) {
          if (savings < minimumTimeSavings) { continue; }
          optimalTimeSavings++;
        }
      }
      return resolve(optimalTimeSavings);
    });
  });

  return promise;
};

type FindFn = (start: Location, radius: number, pathTrace: Map<Coordinates, number>) => Map<Coordinates, number>;

const findTimeSavings: FindFn = (start, radius, pathTrace) => {
  // a radius of 1 is just the next step so there are no savings there
  if (radius <= 1) { return new Map<Coordinates, number>(); }

  // start should exist in the path
  if (!pathTrace.has(start.coordinates)) { return new Map<Coordinates, number>(); }

  const startIndex = pathTrace.get(start.coordinates)!;
  const visited = new Set<Coordinates>();
  visited.add(start.coordinates);

  const timeSavings = new Map<Coordinates, number>();
  const queue: Array<[Location, number]> = [[start, 0]];
  while (queue.length > 0) {
    const [current, distance] = queue.shift()!;
    if (distance > radius) { continue; }

    // there can be time savings only when on a non-wall path
    if (current.symbol !== SymbolType.WALL) {
      if (!pathTrace.has(current.coordinates)) { continue; }

      const index = pathTrace.get(current.coordinates)!;
      const isMovingForward = index > startIndex;

      const pathLength = index - startIndex;
      const isTimeSaving = pathLength > 1;

      if (isMovingForward && isTimeSaving) {
        const savings = pathLength - distance;
        timeSavings.set(current.coordinates, savings);
      }
    }

    for (const neighbor of current.connections) {
      if (visited.has(neighbor.coordinates)) { continue; }
      visited.add(neighbor.coordinates);
      queue.push([neighbor, distance + 1]);
    }
  }

  return timeSavings;
};

export { solution };