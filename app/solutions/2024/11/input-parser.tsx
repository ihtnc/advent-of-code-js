import type { IInputParser } from "@/actions/advent-of-code";
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const stones: Array<string> = [];

      const regexp = new RegExp(/(?<stone>\d+)/, 'g');
        let match: RegExpExecArray | null;
        while(match = regexp.exec(input)) {
          if (!match.groups?.stone) { continue; }

          const stone = match.groups.stone;
          stones.push(stone);
        };

      resolve({ stones });
    });
  });

  return promise;
};

export { inputParser };