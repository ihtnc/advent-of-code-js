import type { IInputParser } from '@/solutions/actions';
import type { InputData, Coordinates } from './types';

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const coordinates: Array<Coordinates> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const ruleMatch = /^(?<x>\d+),(?<y>\d+)\s*$/g.exec(line);
        if(ruleMatch) {
          const x = Number(ruleMatch.groups?.x);
          const y = Number(ruleMatch.groups?.y);

          coordinates.push({ x, y });
        }
      }

      resolve({ coordinates });
    });
  });

  return promise;
};

export { inputParser };