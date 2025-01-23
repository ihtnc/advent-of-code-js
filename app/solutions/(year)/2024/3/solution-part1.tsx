import type { Instructions, InputData } from "./types";

type ParserFn = (input: string) => Promise<InputData>;

const inputParser: ParserFn = async (input) => {
  const promise = new Promise<InputData>((resolve) => {
    const instructions: Array<Instructions> = [];

    const regexp = new RegExp(/mul\((?<data1>\d+),(?<data2>\d+)\)/, 'g');
    let match: RegExpExecArray | null;
    while(match = regexp.exec(input)) {
      const data1 = match.groups?.data1;
      const data2 = match.groups?.data2;
      if (!data1 || !data2) { continue; }

      instructions.push({
        data1: Number(data1),
        data2: Number(data2),
      });
    }

    resolve({ instructions });
  });

  return promise;
};

type Fn = (input: string) => Promise<number>;

const solution: Fn = async (input) => {
  const promise = new Promise<number>(async (resolve) => {
    const { instructions } = await inputParser(input);

    let sum = 0;
    instructions.forEach(instruction => {
      sum += instruction.data1 * instruction.data2;
    });
    resolve(sum);
  });

  return promise;
};

export { inputParser, solution };