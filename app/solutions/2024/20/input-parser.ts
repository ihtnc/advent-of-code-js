import type { IInputParser } from '@/solutions/actions';
import type { InputData, SymbolType } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split(/\s+/);
      const map: Array<Array<SymbolType>> = [];

      let hasStartBorder = false;
      let hasEndBorder = false;
      let startX = -1;
      let startY = -1;
      let endX = -1;
      let endY = -1;

      for (const line of lines) {
        if (line.length === 0) { continue; }

        if (line.match(/^#[#\\.SE]+#$/gi)) {
          if (hasStartBorder && hasEndBorder) { continue; }

          if (line.match(/^[#]+$/g)) {
            hasEndBorder = hasStartBorder && true;
            hasStartBorder = true;
          }

          const startIndex = line.indexOf('S');
          if (startIndex >= 0 && startX < 0 && startY < 0) { startX = startIndex; startY = map.length; }

          const endIndex = line.indexOf('E');
          if (endIndex >= 0 && endX < 0 && endY < 0) { endX = endIndex; endY = map.length; }

          map.push([...line.split('') as Array<SymbolType>]);
        }
      }

      resolve({ map });
    });
  });

  return promise;
};

export { inputParser };