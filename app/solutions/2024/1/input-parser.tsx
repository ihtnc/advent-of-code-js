import type { IInputParser } from "@/actions/advent-of-code";
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>((resolve) => {
    setTimeout(() => {
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
  });

  return promise;
};

export { inputParser };