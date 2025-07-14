import { Direction, SymbolType, type InputData, type Location, type Connection, type PathQueueItem, type Result } from './types';
import SortedQueue from './sorted-queue';

type Fn = ({ map, start, end }: InputData) => Promise<number>;

const solution: Fn = ({ map: data, start, end }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
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
      removeDeadEnds(map);

      const result = findOptimalPath(
        startPath,
        endPath,
        Direction.RIGHT
      );

      return resolve(result?.value ?? 0);
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

      if (symbol !== SymbolType.WALL && top && top.symbol !== SymbolType.WALL) {
        path.connections.push({ direction: Direction.UP, path: top });
        top.connections.push({ direction: Direction.DOWN, path });
      }

      if (symbol !== SymbolType.WALL && left && left.symbol !== SymbolType.WALL) {
        path.connections.push({ direction: Direction.LEFT, path: left });
        left.connections.push({ direction: Direction.RIGHT, path });
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

    for (const connection of path.connections) {
      const { path: next } = connection;

      const toRemove = next.connections.findIndex((c) => c.path === path);
      if (toRemove < 0) { continue; }

      next.connections.splice(toRemove, 1);
      if (next.symbol === SymbolType.EMPTY
        && next.connections.length === 1) {
        queue.push(next);
      }
    }
  }
};

type FindOptimalPathFn = (start: Location, end: Location, orientation: Direction) => Result | null;

const findOptimalPath: FindOptimalPathFn = (start, end, orientation) => {
  // cache of visited paths and their best values
  const visited = new Map<string, number>();

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

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (!current) { continue; }

    // since we always traverse the path with the lowest value
    //   finding the end path is guaranteed to be the best one
    if (current.item.connection.path === end) {
      return {
        value: current.item.value,
        traversed: current.traversed,
      };
    }

    const next = getNextItems(current, visited);
    for (const nextItem of next) {
      const { connection, value } = nextItem.item;
      const key = getKey(connection);
      visited.set(key, value);
      queue.enqueue(nextItem);
    }
  }

  return null;
}

type GetNextItemsFn = (current: PathQueueItem, visited: Map<string, number>) => Array<PathQueueItem>;

const getNextItems: GetNextItemsFn = (current, visited) => {
  const turnValue = 1000;
  const queue: Array<PathQueueItem> = [];

  // get a list of connected paths from the current path
  const { value: currentValue, connection: currentConnection } = current.item;
  const { direction: orientation, path: currentPath } = currentConnection;
  const { connections } = currentPath;
  for (const connection of connections) {
    const { direction, path } = connection;
    const key = getKey(connection);

    // skip path if already visited and is worse than what was already stored
    if (visited.has(key) && visited.get(key)! <= currentValue) { continue; }

    // skip the path that goes back to the current path
    if (isOpposite(orientation, direction)) { continue; }

    const queueItem: PathQueueItem = {
      item: {
        connection,
        value: currentValue + 1 + (turnValue * getMultiplier(orientation, direction)),
      },
      traversed: {
        coordinate: path.coordinates,
        previous: current.traversed,
      },
    };
    queue.push(queueItem);
  }

  return queue;
};

type GetKeyFn = (item: Connection) => string;

const getKey: GetKeyFn = (item) => {
  const { x, y } = item.path.coordinates;
  return `${x}|${y}|${item.direction}`;
};

type GetMultiplierFn = (orientation: Direction, direction: Direction) => number;

const getMultiplier: GetMultiplierFn = (orientation, direction) => {
  if (isOpposite(orientation, direction)) {
    return 2;
  } else if (isPerpendicular(orientation, direction)) {
    return 1;
  }

  return 0;
}

type CompareFn = (orientation: Direction, direction: Direction) => boolean;

const isStraight: CompareFn = (orientation, direction) => {
  return orientation === direction;
};

const isOpposite: CompareFn = (orientation, direction) => {
  return (orientation === Direction.LEFT && direction === Direction.RIGHT
    || orientation === Direction.RIGHT && direction === Direction.LEFT
    || orientation === Direction.UP && direction === Direction.DOWN
    || orientation === Direction.DOWN && direction === Direction.UP
  );
};

const isPerpendicular: CompareFn = (orientation, direction) => {
  return !isOpposite(orientation, direction) && !isStraight(orientation, direction);
};

export { solution, convert, removeDeadEnds, getNextItems, getKey };