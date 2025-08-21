import type { IInputParser } from '@/solutions/actions';
import { type InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const pMatch = /^(?<patterns>(?:[a-z]+)(?:\s*,\s*[a-z]+)*)\s+$/gmi.exec(input)
      const patterns = pMatch?.groups?.patterns?.split(',').map(pattern => pattern.trim()) ?? [];

      const designs = [];
      const regex = '^(?<design>[a-z]+)\\s*$';
      const regexp = new RegExp(regex, 'gmi');
      let dMatch: RegExpExecArray | null;
      while(dMatch = regexp.exec(input)) {
        const design = dMatch.groups?.design ?? '';
        designs.push(design);
      };

      resolve({ patterns, designs });
    });
  });

  return promise;
};

export { inputParser };