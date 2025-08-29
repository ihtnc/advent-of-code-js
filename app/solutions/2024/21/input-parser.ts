import type { IInputParser } from '@/solutions/actions';
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split(/\s+/);
      const codes: Array<string> = [];

      for (const line of lines) {
        if (line.length === 0) { continue; }

        const match = /^\s*(?<code>\d{3}a)\s*$/gmi.exec(line);
        if (match?.groups?.code) {
          codes.push(match.groups.code);
        }
      }

      resolve({ codes });
    });
  });

  return promise;
};

export { inputParser };