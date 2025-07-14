import { convert, getKey, getNextItems, removeDeadEnds } from './solution-part1';
import SortedQueue from './sorted-queue';
import { Direction, type InputData, type PathQueueItem, type Result, type Location, type Coordinates } from './types';

type Fn = ({ map, start, end }: InputData) => Promise<number>;

const solution: Fn = async ({ map:data, start, end }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      // check part 1 for convert definition
      const map = convert(data);
      if (map.length === 0) { return resolve(0); }
      if (start.y < 0 || start.y >= map.length) {
        return resolve(0);
      }
      if (start.x < 0 || start.x >= map[0].length) {
        return resolve(0);
      }

      if (end.y < 0 || end.y >= map.length) {
        return resolve(0);
      }
      if (end.x < 0 || end.x >= map[0].length) {
        return resolve(0);
      }

      const startPath = map[start.y][start.x];
      const endPath = map[end.y][end.x];
      // check part 1 for removeDeadEnds definition
      removeDeadEnds(map);

      // limit search to the first 10000 results
      // may need to be adjusted
      const threshold = 10000;

      const paths = findOptimalPaths(
        startPath,
        endPath,
        Direction.RIGHT,
        threshold
      );

      const result = countUniquePaths(paths);
      // add 1 to the result to account for the start path
      return resolve(result + 1);
    });
  });

  return promise;
};

type FindOptimalPathsFn = (start: Location, end: Location, orientation: Direction, threshold: number) => Array<Result>;

const findOptimalPaths: FindOptimalPathsFn = (start, end, orientation, threshold) => {
  // cache of visited paths and their best values
  const visited = new Map<string, number>();
  const optimalPaths: Array<Result> = [];

  // queue of items that are always sorted by their value descending
  const queue = new SortedQueue((a: PathQueueItem, b: PathQueueItem) => {
    return a.item.value - b.item.value;
  });

  // add the start path to the queue
  queue.enqueue({
    item: {
      connection: { path: start, direction: orientation },
      value: 0,
    },
    traversed: null,
  });

  let optimalValue: number | null = null;
  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (!current) { continue; }

    // since we always traverse the path with the lowest value
    //   finding the end path is guaranteed to be the best one
    if (current.item.connection.path === end) {
      if (threshold < 0) { return []; }

      const result: Result = {
        value: current.item.value,
        traversed: current.traversed,
      }

      if (optimalValue === null) { optimalValue = result.value; }

      // stop searching if the value is no longer the same as the optimal one
      if (optimalValue !== null && result.value !== optimalValue) {
        return optimalPaths;
      }

      // stop searching if the threshold is reached
      if (optimalPaths.length > threshold) {
        return optimalPaths;
      }

      optimalPaths.push(result);
      continue;
    }

    // check part 1 for getNextItems definition
    const next = getNextItems(current, visited);
    for (const nextItem of next) {
      const { connection, value } = nextItem.item;

      // check part 1 for getKey definition
      const key = getKey(connection);
      visited.set(key, value);
      queue.enqueue(nextItem);
    }
  }

  return optimalPaths;
}

type CountUniquePathsFn = (paths: Array<Result>) => number;

const countUniquePaths: CountUniquePathsFn = (paths) => {
  const uniquePaths = new Set<Coordinates>();

  for (const path of paths) {
    let traversed = path.traversed;

    while (traversed) {
      uniquePaths.add(traversed.coordinate);
      traversed = traversed.previous;
    }
  }

  return uniquePaths.size;
};

export { solution };