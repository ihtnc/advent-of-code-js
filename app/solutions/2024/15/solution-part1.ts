import { type InputData, type Coordinates, Direction, SymbolType } from './types';

type Fn = ({ map, initial, instructions }: InputData) => Promise<number>;

const solution: Fn = async ({ map: data, initial, instructions }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const map = copyMap(data);
      let current = initial;
      for (const direction of instructions) {
        const next = getNext(current, direction, map);
        if (!next) { return false; }

        if (isBox(next, map)) {
          if (!canPush(next, direction, map)) { continue; }
          if (!moveBox(next, direction, map)) { continue; }
        }

        if (!moveRobot(current, direction, map)) { continue; }
        current = next;
      }

      const total = calculate(map);
      resolve(total);
    });
  });

  return promise;
};

type CheckFn = (location: Coordinates, map: Array<Array<SymbolType>>) => boolean;

const isBox: CheckFn = (location, map) => {
  if (!isValidCoordinate(location, map)) { return false; }

  const { x, y } = location;
  return map[y][x] === SymbolType.BOX
    || map[y][x] === SymbolType.BOX_START
    || map[y][x] === SymbolType.BOX_END;
}

type PushFn = (initial: Coordinates, direction: Direction, map: Array<Array<SymbolType>>) => boolean;

const canPush: PushFn = (initial, direction, map) => {
  if (!isValidCoordinate(initial, map)) { return false; }
  if (!isBox(initial, map)) { return false; }

  const next = getNext(initial, direction, map);
  if (!next) { return false; }

  if (isBox(next, map)) {
    return canPush(next, direction, map);
  }

  const { x: nextX, y: nextY } = next;
  return map[nextY][nextX] === SymbolType.EMPTY;
};

type ValidateFn = (initial: Coordinates, map: Array<Array<SymbolType>>) => boolean;

const isValidCoordinate: ValidateFn = (initial, map) => {
  const { x, y } = initial;
  if (y < 0 || y >= map.length) { return false; }
  if (x < 0 || x >= map[y].length) { return false; }
  return true;
}

type GetNextFn = (initial: Coordinates, direction: Direction, map: Array<Array<SymbolType>>) => Coordinates | null;

const getNext: GetNextFn = (initial, direction, map) => {
  const { x, y } = initial;

  let xOffset = 0;
  let yOffset = 0;

  switch(direction) {
    case Direction.UP:
      yOffset = y > 0 ? -1 : 0;
      break;
    case Direction.DOWN:
      yOffset = y < map.length - 1 ? 1 : 0;
      break;
    case Direction.LEFT:
      xOffset = x > 0 ? -1 : 0;
      break;
    case Direction.RIGHT:
      xOffset = x < map[y].length - 1 ? 1 : 0;
      break;
    default:
      return null;
  }

  if (xOffset === 0 && yOffset === 0) { return null; }

  const nextX = x + xOffset;
  const nextY = y + yOffset;
  return { x: nextX, y: nextY };
};

type MoveFn = (initial: Coordinates, direction: Direction, map: Array<Array<SymbolType>>) => boolean;

const moveBox: MoveFn = (initial, direction, map) => {
  if (!isValidCoordinate(initial, map)) { return false; }
  if (!isBox(initial, map)) { return false; }

  const next = getNext(initial, direction, map);
  if (!next) { return false; }

  if (isBox(next, map)) {
    const moved = moveBox(next, direction, map);
    if (!moved) { return false; }
  }

  const { x, y } = initial;
  const { x: nextX, y: nextY } = next;

  if (map[nextY][nextX] === SymbolType.EMPTY) {
    map[nextY][nextX] = map[y][x];
    map[y][x] = SymbolType.EMPTY;
    return true;
  }

  return false;
};

const moveRobot: MoveFn = (initial, direction, map) => {
  if (!isValidCoordinate(initial, map)) { return false; }

  const { x, y } = initial;
  if (map[y][x] !== SymbolType.ROBOT) { return false; }

  const next = getNext(initial, direction, map);
  if (!next) { return false; }

  const { x: nextX, y: nextY } = next;
  if (map[nextY][nextX] === SymbolType.EMPTY) {
    map[nextY][nextX] = SymbolType.ROBOT;
    map[y][x] = SymbolType.EMPTY;
    return true;
  }

  return false;
};

type CalculateFn = (map: Array<Array<SymbolType>>) => number;

const calculate: CalculateFn = (map) => {
  let total = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === SymbolType.BOX
        || map[y][x] === SymbolType.BOX_START) {
        total += (100 * y) + x;
      }
    }
  }

  return total;
};

type CopyFn = (map: Array<Array<SymbolType>>) => Array<Array<SymbolType>>;

const copyMap: CopyFn = (map) => {
  return map.map((row) => row.slice());
};

export { solution, isBox, canPush, isValidCoordinate, getNext, copyMap, moveBox, moveRobot, calculate };