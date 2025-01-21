import type { IInputParser } from "@/actions/advent-of-code";

export interface InputData {
  data1: Array<number>;
  data2: Array<number>;
}

const inputParser: IInputParser<InputData> = async (input: string) => {
  const lines = input.split('\n');
  const data1: Array<number> = [];
  const data2: Array<number> = [];

  const promise = new Promise<InputData>((resolve) => {
    lines.forEach((line) => {
      if (!line) { return; }

      const numbers = line.split(/\s+/);
      if (numbers.length !== 2) { return; }

      data1.push(parseInt(numbers[0], 10));
      data2.push(parseInt(numbers[1], 10));
    });

    resolve({ data1, data2 });
  });

  return promise;
};

export { inputParser };