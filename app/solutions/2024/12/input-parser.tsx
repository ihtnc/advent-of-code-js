import type { IInputParser } from "@/actions/advent-of-code";
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');

      const map: Array<Array<string>> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const currentLine: Array<string> = [];

        const regexp = new RegExp(/(?<plant>[A-Za-z])/, 'g');
        let match: RegExpExecArray | null;
        while(match = regexp.exec(line)) {
          const plant = match.groups?.plant ?? '';
          currentLine.push(plant);
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