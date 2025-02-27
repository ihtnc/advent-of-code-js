import type { InputData, Instructions } from "./types";

type Fn = (input: string) => Promise<number>;

const solution: Fn = async (input) => {
  const { instructions } = await convert(input);

  let sum = 0;
  for (const instruction of instructions) {
    sum += instruction.data1 * instruction.data2;
  }

  return sum;
};

type ConvertFn = (input: string, ignoreConditions?: boolean) => Promise<InputData>;

const convert: ConvertFn = async (input, ignoreConditions = true) => {
  const promise = new Promise<InputData>((resolve) => {
    setTimeout(() => {
      const instructions: Array<Instructions> = [];

      const regexp = new RegExp(/(?<instructions>mul\((?<data1>\d+),(?<data2>\d+)\))|(?<do>do\(\))|(?<dont>don't\(\))/, 'g');
      let enabled = true;
      let match: RegExpExecArray | null;
      while(match = regexp.exec(input)) {
        if (!ignoreConditions && match.groups?.do) {
          enabled = true;
        }
        else if (!ignoreConditions && match.groups?.dont) {
          enabled = false;
        }
        else if (match.groups?.instructions && enabled) {
          const data1 = match.groups?.data1;
          const data2 = match.groups?.data2;
          if (!data1 || !data2) { continue; }

          instructions.push({
            data1: Number(data1),
            data2: Number(data2),
          });
        }
      }

      resolve({ instructions });
    });
  });

  return promise;
};

export { convert, solution };