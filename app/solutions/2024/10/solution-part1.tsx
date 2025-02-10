import { Direction, type InputData, type Path, type Trail } from './types';

type Fn = ({ map }: InputData) => Promise<number>;

const solution: Fn = async ({ map: input }) => {
  const map = convert(input);
  blockInvalidPaths(map);
  const trailHeads = find(map, 0);

  const tasks = [];
  let totalScore = 0;
  for (const trailHead of trailHeads) {
    tasks.push(findSummit(trailHead)
      .then((paths) => { totalScore += paths.length; })
    );
  }
  await Promise.all(tasks);

  return totalScore;
};

type ConvertFn = (map: Array<Array<number>>) => Array<Array<Trail>>;

const convert: ConvertFn = (map) =>  {
  const newMap: Array<Array<Trail>> = [];
  let previousLine: Array<Trail> = [];

  for (const line of map) {
    const newLine: Array<Trail> = [];
    for (let i = 0; i < line.length; i++) {
      const height = line[i];

      let top: Trail | undefined;
      if (previousLine.length === line.length) {
        top = previousLine[i];
      }

      let left: Trail | undefined;
      if (i > 0) {
        left = newLine[i - 1];
      }

      const trail: Trail = {
        height,
        top,
        left,
      };

      if (top) { top.bottom = trail; }
      if (left) { left.right = trail; }

      newLine.push(trail);
    }

    if (newLine.length === 0) { continue; }

    newMap.push(newLine);
    previousLine = newLine;
  }

  return newMap;
};

type BlockFn = (map: Array<Array<Trail>>) => void;

const blockInvalidPaths: BlockFn = (map) => {
  for (const line of map) {
    for (const tile of line) {
      const nextHeight = tile.height + 1;

      if (tile.right?.height != nextHeight) {
        tile.right = undefined;
      }

      if (tile.left?.height != nextHeight) {
        tile.left = undefined;
      }

      if (tile.bottom?.height != nextHeight) {
        tile.bottom = undefined;
      }

      if (tile.top?.height != nextHeight) {
        tile.top = undefined;
      }
    }
  }
};

type FindFn = (map: Array<Array<Trail>>, height: number) => Array<Trail>;

const find: FindFn = (map, height) => {
  const tiles: Array<Trail> = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      if (tile.height === height) {
        tiles.push(tile);
      }
    }
  }

  return tiles;
};

type FindSummitFn = (start: Trail, findAll?: boolean) => Promise<Array<Path>>;

const findSummit: FindSummitFn = (start, findAll) => {
  const promise = new Promise<Array<Path>>((resolve) => {
    setTimeout(() => {
      const ignoreList = findAll ? undefined : new Set<Trail>();
      const paths = traverse(start, ignoreList);
      resolve(paths);
    });
  });

  return promise;
};

type TraverseFn = (trail: Trail, ignoreList?: Set<Trail>) => Array<Path>;

const traverse: TraverseFn = (trail, ignoreList) => {
  const next = getNextPaths(trail, ignoreList);
  ignoreList?.add(trail);

  const response: Array<Path> = [];

  while (next.length > 0) {
    const current = next.pop();
    if (!current?.next) { continue; }

    const paths = traverse(current.next.trail, ignoreList);
    if (paths.length === 0) { continue; }

    for (const path of paths) {
      const newPath: Path = {
        trail,
        direction: current.direction,
        next: path,
      };
      response.push(newPath);
    }
  }

  if (trail.height === 9) {
    const path: Path = { trail };
    return [path];
  }

  return response;
};

type GetNextFn = (trail: Trail, ignoreList?: Set<Trail>) => Array<Path>;

const getNextPaths: GetNextFn = (trail, ignoreList) => {
  const next: Array<Path> = [];

  if (trail.bottom && !ignoreList?.has(trail.bottom)) {
    const path: Path = {
      trail,
      direction: Direction.DOWN,
      next: { trail: trail.bottom },
    };
    next.push(path);
  }

  if (trail.top && !ignoreList?.has(trail.top)) {
    const path: Path = {
      trail,
      direction: Direction.UP,
      next: { trail: trail.top },
    };
    next.push(path);
  }

  if (trail.left && !ignoreList?.has(trail.left)) {
    const path: Path = {
      trail,
      direction: Direction.LEFT,
      next: { trail: trail.left },
    };
    next.push(path);
  }

  if (trail.right && !ignoreList?.has(trail.right)) {
    const path: Path = {
      trail,
      direction: Direction.RIGHT,
      next: { trail: trail.right },
    };
    next.push(path);
  }

  return next;
};

export { solution, convert, blockInvalidPaths, find, findSummit };