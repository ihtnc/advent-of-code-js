import type { InputData } from './types';

type Fn = ({ lines }: InputData) => Promise<number>;

const solution: Fn = async ({ lines }) => {
  let total = 0;
  for (let row = 0; row < lines.length; row++) {
    const regexp = new RegExp(/[X]/, 'g');
    const line = lines[row];

    let match: RegExpExecArray | null;
    while(match = regexp.exec(line)) {
      const col = match.index;

      total += await findAll(row, col, lines);
    }
  }

  return total;
};

type FindAllFn = {
  (row: number, col: number, input: Array<string>): Promise<number>
};

const findAll: FindAllFn = async (row, col, input) => {
  if (input[row][col] !== 'X') { return 0; }

  let found = 0;

  const tasks = [
    find(row, col, input, VDirection.None, HDirection.Right).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.None, HDirection.Left).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Down, HDirection.None).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Up, HDirection.None).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Down, HDirection.Right).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Down, HDirection.Left).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Up, HDirection.Right).then(() => found++).catch(() => {}),
    find(row, col, input, VDirection.Up, HDirection.Left).then(() => found++).catch(() => {})
  ];

  await Promise.all(tasks);

  return found;
};

enum VDirection {
  Down,
  Up,
  None,
};

enum HDirection {
  Right,
  Left,
  None,
};

type FindFn = (row: number, col: number, input: Array<string>, v: VDirection, h: HDirection) => Promise<boolean>;

const find: FindFn = async (row, col, input, v, h) => {
  const promise = new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      const boundsCondition = getBoundsConditionFn(v, h);
      const findCondition = getFindFn(v, h);

      const isWithinBounds = boundsCondition(row, col, input);
      if (isWithinBounds && findCondition(row, col, input)) {
        resolve(true);
      } else {
        reject();
      }
    });
  });

  return promise;
};

type ConditionFn = (row: number, col: number, input: Array<string>) => boolean;

type GetFn = (v: VDirection, h: HDirection) => ConditionFn;

const getBoundsConditionFn: GetFn = (v, h) => {
  let rowCondition: ConditionFn = () => true;
  switch (v) {
    case VDirection.Down:
      rowCondition = (row, _, input) => {
        return row + 3 < input.length
      };
      break;

    case VDirection.Up:
      rowCondition = (row) => {
        return row >= 3;
      }
      break;
  }

  let colCondition: ConditionFn = () => true;
  switch (h) {
    case HDirection.Right:
      colCondition = (row, col, input) => {
        return col + 3 < input[row].length;
      };
      break;

    case HDirection.Left:
      colCondition = (_, col) => {
        return col >= 3;
      };
      break;
  }

  return (row, col, input) => {
    return rowCondition(row, col, input) && colCondition(row, col, input);
  };
};

const getFindFn: GetFn = (v, h) => {
  let rowMultiplier = 1;
  let colMultiplier = 1;

  switch (v) {
    case VDirection.Up:
      rowMultiplier = -1;
      break;
    case VDirection.None:
      rowMultiplier = 0;
      break;
  }

  switch (h) {
    case HDirection.Left:
      colMultiplier = -1;
      break;
    case HDirection.None:
      colMultiplier = 0;
      break;
  }

  return (row, col, input) => {
    return input[row][col] === 'X'
      && input[row + (1 * rowMultiplier)][col + (1 * colMultiplier)] === 'M'
      && input[row + (2 * rowMultiplier)][col + (2 * colMultiplier)] === 'A'
      && input[row + (3 * rowMultiplier)][col + (3 * colMultiplier)] === 'S';
  };
}

export { solution };