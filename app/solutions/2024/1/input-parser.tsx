import type { IInputParser } from "@/actions/advent-of-code";

export type InputData = {
  data1: Array<number>,
  data2: Array<number>,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>((resolve) => {
    const lines = input.split('\n');
    const data1: Array<number> = [];
    const data2: Array<number> = [];

    for (const line of lines) {
      if (!line) { continue; }

      const numbers = line.split(/\s+/);
      if (numbers.length !== 2) { continue; }

      data1.push(Number(numbers[0]));
      data2.push(Number(numbers[1]));
    }

    resolve({ data1, data2 });
  });

  return promise;
};

export { inputParser };