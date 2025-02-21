import type { IInputParser } from '@/solutions/actions';
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');

      const map: Array<Array<number>> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const currentLine: Array<number> = [];

        const regexp = new RegExp(/(?<height>\d)/, 'g');
        let match: RegExpExecArray | null;
        while(match = regexp.exec(line)) {
          const height = match.groups?.height ? Number(match.groups.height) : -1;
          currentLine.push(Number(height));
        };

        if (currentLine.length === 0) { continue; }

        map.push(currentLine);
      }

      resolve({ map });
    });
  });

  return promise;
};

export { inputParser };