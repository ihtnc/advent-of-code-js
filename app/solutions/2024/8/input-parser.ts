import type { IInputParser } from '@/solutions/actions';
import type { Antennae, InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split(/\s+/);
      const map = { rows: 0, cols: lines[0].length };
      const antennae: Antennae = {};

      for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        if (!line) { continue; }

        map.rows++;

        const regexp = new RegExp(/(?<id>[A-Za-z0-9])/, 'g');
        let match: RegExpExecArray | null;
        while(match = regexp.exec(line)) {
          const idValue = match.groups?.id;
          if (!idValue) { continue; }
          if (antennae[idValue] === undefined) {
            antennae[idValue] = [];
          }

          antennae[idValue].push({ x: match.index, y });
        }
      }

      resolve({ map, antennae });
    });
  });

  return promise;
};

export { inputParser };