import type { IInputParser } from '@/solutions/actions';
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>((resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const data1: Array<number> = [];
      const data2: Array<number> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const ruleMatch = /^\s*(?<num1>\d+)\s+(?<num2>\d+)\s*$/g.exec(line);
        if (ruleMatch) {
          const num1 = ruleMatch.groups?.num1;
          const num2 = ruleMatch.groups?.num2;
          data1.push(Number(num1));
          data2.push(Number(num2));
        }
      }

      resolve({ data1, data2 });
    });
  });

  return promise;
};

export { inputParser };