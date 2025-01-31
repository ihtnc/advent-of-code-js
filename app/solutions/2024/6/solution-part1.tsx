import { Direction, Move, InputData, Marker } from './input-parser';

type Fn = ({ map, guard }: InputData) => Promise<number>;

export enum PathType {
  Looping,
  Terminating,
};

export type Path = {
  move?: Move,
  next?: Path,
};

const solution: Fn = async ({ map, guard }) => {
  const { start } = await traverse(map, guard);

  let currentPath: Path | undefined = start;
  while (currentPath?.next) {
    const next = currentPath.next;
    if (!next.move) { break; }

    map[next.move.y][next.move.x] = Marker.Visited;
    currentPath = currentPath.next;
  }

  const result = countVisited(map);
  return result;
};

type TraversedPath = {
  start: Path,
  type: PathType,
};

type TraverseFn = (map: Array<Array<Marker>>, move: Move) => Promise<TraversedPath>;

const traverse: TraverseFn = (map, move) => {
  const promise = new Promise<TraversedPath>((resolve) => {
    setTimeout(() => {
      const start: Path = {};
      let pathType = PathType.Terminating;
      let previousPath = start;

      let current: Move | null = move;
      do {
        // if the current step is part of the traversed path
        //   then a loop is found
        const visited = findMove(start, current);
        if (visited) {
          pathType = PathType.Looping;
          break;
        }

        const currentPath: Path = {
          move: {
            x: current.x,
            y: current.y,
            direction: current.direction,
          },
        };
        previousPath.next = currentPath;

        const next = getNextMove(map, current);
        if (next === null) { break; }

        if (next.x === current.x && next.y === current.y
          && next.direction === current.direction) {
          break;
        }

        // move just changes direction,
        //   so just update the current move
        if (next.x === current.x && next.y === current.y) {
          current.direction = next.direction;
          currentPath.move!.direction = next.direction;
          continue;
        }

        // move is back to the start
        //   do not proceed further
        if (next.x === move.x && next.y === move.y
          && next.direction === move.direction
        ) {
          pathType = PathType.Looping;
          break;
        }

        previousPath = currentPath;
        current = next;
      } while(current !== null);

      resolve({ start, type: pathType });
    });
  });

  return promise;
};

type MoveFn = (map: Array<Array<Marker>>, move: Move) => Move | null;

const getNextMove: MoveFn = (map, move) => {
  let yOffset = 0;
  let xOffset = 0;

  switch (move.direction) {
    case Direction.Up:
      yOffset = -1;
      break;
    case Direction.Down:
      yOffset = 1;
      break;
    case Direction.Left:
      xOffset = -1;
      break;
    case Direction.Right:
      xOffset = 1;
      break;
  }

  if (xOffset === 0 && yOffset === 0) { return null; }

  const nextY = move.y + yOffset;
  const nextX = move.x + xOffset;
  if (nextY < 0 || nextY >= map.length) { return null; }
  if (nextX < 0 || nextX >= map[nextY].length) { return null; }

  const nextStep = map[nextY][nextX];
  if (nextStep === Marker.Obstacle) { return rotate(move); }

  return {
    x: nextX,
    y: nextY,
    direction: move.direction,
  };
};

type RotateFn = (move: Move) => Move | null;

const rotate: RotateFn = (move) => {
  const newMove = {
    x: move.x,
    y: move.y,
    direction: move.direction,
  };

  switch (move.direction) {
    case Direction.Up:
      newMove.direction = Direction.Right;
      break;
    case Direction.Down:
      newMove.direction = Direction.Left;
      break;
    case Direction.Left:
      newMove.direction = Direction.Up;
      break;
    case Direction.Right:
      newMove.direction = Direction.Down;
      break;
    default:
      return null;
  }

  return newMove;
}

type FindFn = (path: Path, move: Move) => Path | undefined;

const findMove: FindFn = (path, move) => {
  let current = path;
  while (current.next) {
    if (current.move?.x === move.x && current.move?.y === move.y
      && current.move?.direction === move.direction) {
      return current;
    }
    current = current.next;
  }

  return undefined;
};

type CountFn = (map: Array<Array<Marker>>) => number;

const countVisited: CountFn = (map) => {
  let visited = 0;
  for (const row of map) {
    for (const cell of row) {
      if (cell === Marker.Visited) {
        visited++;
      }
    }
  }

  return visited;
};

export { solution, traverse, getNextMove };