import { calculate, getNext, isBox, moveRobot, canPush as canPushSingle, moveBox as moveBoxSingle } from './solution-part1';
import { type InputData, type Coordinates, Direction, SymbolType } from './types';
import { copyMap, isValidCoordinate } from './utilities';

type Fn = ({ map, initial, instructions }: InputData) => Promise<number>;

const solution: Fn = async ({ map: data, initial: start, instructions }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const { map, initial } = expand(data, start);

      let current = initial;
      for (const direction of instructions) {
        // check part 1 for getNext definition
        const next = getNext(current, direction, map);
        if (!next) { return false; }

        // check part 1 for isBox definition
        if (isBox(next, map)) {
          if (!canPush(next, direction, map)) { continue; }
          if (!moveBox(next, direction, map)) { continue; }
        }

        // check part 1 for moveRobot definition
        if (!moveRobot(current, direction, map)) { continue; }
        current = next;
      }

      // check part 1 for calculate definition
      const total = calculate(map);
      resolve(total);
    });
  });

  return promise;
};

type PushFn = (initial: Coordinates, direction: Direction, map: Array<Array<SymbolType>>) => boolean;

const canPush: PushFn = (initial, direction, map) => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    // check part 1 canPush for definition
    return canPushSingle(initial, direction, map);
  }

  if (!isValidCoordinate(initial, map)) { return false; }

  // check part 1 for isBox definition
  if (!isBox(initial, map)) { return false; }

  const { x, y } = initial;
  const start = map[y][x] === SymbolType.BOX_START
    ? initial
    : { x: x - 1, y };
  const end = map[y][x] === SymbolType.BOX_START
    ? { x: x + 1, y }
    : initial;

  // check part 1 for getNext definition
  const nextStart = getNext(start, direction, map);
  const nextEnd = getNext(end, direction, map);
  if (!nextStart || !nextEnd) { return false; }

  let canPushStart = map[nextStart.y][nextStart.x] === SymbolType.EMPTY
  // check part 1 for isBox definition
  if (isBox(nextStart, map)) {
    canPushStart = canPush(nextStart, direction, map);
  }

  let canPushEnd = map[nextEnd.y][nextEnd.x] === SymbolType.EMPTY
  // check part 1 for isBox definition
  if (isBox(nextEnd, map)) {
    canPushEnd = canPush(nextEnd, direction, map);
  }

  return canPushStart && canPushEnd;
};

type MoveFn = (initial: Coordinates, direction: Direction, map: Array<Array<SymbolType>>) => boolean;

const moveBox: MoveFn = (initial, direction, map) => {
  if (direction === Direction.LEFT || direction === Direction.RIGHT) {
    // check part 1 moveBox for definition
    return moveBoxSingle(initial, direction, map);
  }

  if (!isValidCoordinate(initial, map)) { return false; }

  // check part 1 for isBox definition
  if (!isBox(initial, map)) { return false; }

  const { x, y } = initial;
  const start = map[y][x] === SymbolType.BOX_START
    ? initial
    : { x: x - 1, y };
  const end = map[y][x] === SymbolType.BOX_START
    ? { x: x + 1, y }
    : initial;

  // check part 1 for getNext definition
  const nextStart = getNext(start, direction, map);
  const nextEnd = getNext(end, direction, map);
  if (!nextStart || !nextEnd) { return false; }

  const { x: nextStartX, y: nextStartY } = nextStart;
  const { x: nextEndX, y: nextEndY } = nextEnd;

  // check part 1 for isBox definition
  const isNextStartBox = isBox(nextStart, map);
  const isNextEndBox = isBox(nextEnd, map);
  const nextStartSymbol = map[nextStartY][nextStartX];
  const nextEndSymbol = map[nextEndY][nextEndX];

  let movedStart = false;
  if (isNextStartBox) {
    movedStart = moveBox(nextStart, direction, map);
  }

  let movedEnd = nextStartSymbol === SymbolType.BOX_START
    ? movedStart
    : false;

  // skip if end symbol is a box end,
  //   since it would have been moved as part of moving the box start
  if (isNextEndBox
    && nextEndSymbol !== SymbolType.BOX_END) {
    movedEnd = moveBox(nextEnd, direction, map);
  }

  if (isNextStartBox && !movedStart) { return false; }
  if (isNextEndBox && !movedEnd) { return false; }
  if (map[nextStartY][nextStartX] !== SymbolType.EMPTY) { return false; }
  if (map[nextEndY][nextEndX] !== SymbolType.EMPTY) { return false; }

  const { x: startX, y: startY } = start;
  map[nextStartY][nextStartX] = SymbolType.BOX_START;
  map[startY][startX] = SymbolType.EMPTY;

  const { x: endX, y: endY } = end;
  map[nextEndY][nextEndX] = SymbolType.BOX_END;
  map[endY][endX] = SymbolType.EMPTY

  return true;
};

type ExpandFn = (map: Array<Array<SymbolType>>, initial: Coordinates) => { map: Array<Array<SymbolType>>, initial: Coordinates };

const expand: ExpandFn = (map, initial) => {
  const copy = copyMap(map);
  const expanded: Array<Array<SymbolType>> = [];

  for (let y = 0; y < copy.length; y++) {
    const row = [];
    for (let x = 0; x < copy[y].length; x++) {
      const symbol1 = copy[y][x] === SymbolType.BOX
        ? SymbolType.BOX_START
        : copy[y][x];

      row.push(symbol1);

      let symbol2: SymbolType;
      switch (copy[y][x])
      {
        case SymbolType.BOX:
          symbol2 = SymbolType.BOX_END;
          break;
        case SymbolType.ROBOT:
          symbol2 = SymbolType.EMPTY;
          break;
        default:
          symbol2 = copy[y][x];
          break;
      }

      row.push(symbol2);
    }

    expanded.push(row);
  }

  return {
    map: expanded,
    initial: { x: initial.x * 2, y: initial.y },
  };
};

export { solution };