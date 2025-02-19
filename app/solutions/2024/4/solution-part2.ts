import type { InputData } from './types';

type Fn = ({ lines }: InputData) => Promise<number>;

const solution: Fn = async ({ lines }) => {
  let total = 0;

  // we are looking for the middle letter A so we can skip the first and last row
  for (let row = 1; row < lines.length - 1; row++) {
    const regexp = new RegExp(/[A]/, 'g');
    const line = lines[row];

    let match: RegExpExecArray | null;
    while(match = regexp.exec(line)) {
      const col = match.index;

      total += await findAll(row, col, lines);
    }
  }

  return total;
};

type FindAllFn = (row: number, col: number, input: Array<string>) => Promise<number>;

const findAll: FindAllFn = async (row, col, input) => {
  // we are looking for the middle letter A so we can skip the first and last column
  if (col === 0 || col === input[row].length - 1) { return 0; }
  if (input[row][col] !== 'A') { return 0; }

  let foundLeftArm = false;
  let foundRightArm = false;

  const tasks = [
    find(row, col, input, true, false).then(() => foundLeftArm = true).catch(() => {}),
    find(row, col, input, true, true).then(() => foundLeftArm = true).catch(() => {}),
    find(row, col, input, false, false).then(() => foundRightArm = true).catch(() => {}),
    find(row, col, input, false, true).then(() => foundRightArm = true).catch(() => {}),
  ];

  await Promise.all(tasks);

  return foundLeftArm && foundRightArm ? 1 : 0;
};

type FindFn = {
  (row: number, col: number, input: Array<string>, isLeftArm: boolean, reverse: boolean): Promise<boolean>
};

const find: FindFn = async (row, col, input, isLeftArm, reverse) => {
  const promise = new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      const first = reverse ? 'S' : 'M';
      const firstOffset = isLeftArm ? -1 : 1;
      const middle = 'A';
      const last = reverse ? 'M' : 'S';
      const lastOffset = isLeftArm ? 1 : -1;

      if (input[row - 1][col + firstOffset] === first
        && input[row][col] === middle
        && input[row + 1][col + lastOffset] === last) {
        resolve(true);
      } else {
        reject();
      }
    });
  });

  return promise;
};

export { solution };