import type { IInputParser } from '@/solutions/actions';
import type { Direction, InputData, SymbolType } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split(/\s+/);
      const map: Array<Array<SymbolType>> = [];
      const instructions: Array<Direction> = [];

      let hasStartBorder = false;
      let hasEndBorder = false;
      let x = -1;
      let y = -1;

      for (const line of lines) {
        if (line.length === 0) { continue; }

        if (line.match(/^#[#\\.O@]+#$/gi)) {
          if (hasStartBorder && hasEndBorder) { continue; }

          if (line.match(/^[#]+$/g)) {
            hasEndBorder = hasStartBorder && true;
            hasStartBorder = true;
          }

          const index = line.indexOf('@');
          if (index >= 0 && x < 0 && y < 0) { x = index; y = map.length; }

          map.push([...line.split('') as Array<SymbolType>]);

        } else if (line.match(/^[v^<>]+$/gi)) {
          instructions.push(...line.split('') as Array<Direction>);
        }
      }

      resolve({ map, initial: { x, y }, instructions });
    });
  });

  return promise;
};

export { inputParser };