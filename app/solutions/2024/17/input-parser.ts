import type { IInputParser } from '@/solutions/actions';
import { type InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const getRegisterValue = (name: string, input: string): number => {
        const registerRegex = `^\\s*register\\s+${name}\\s*:\\s*(?<register>\\d+)\\s*`;
        const match = new RegExp(registerRegex, 'gmi').exec(input);
        return match ? Number(match.groups?.register) : 0;
      };

      const a = getRegisterValue('a', input);
      const b = getRegisterValue('b', input);
      const c = getRegisterValue('c', input);


      const matches = /^\s*program\s*:(?<instructions>(\s*,?[0-7])+)\s*/gmi.exec(input);
      const instructions = matches?.groups?.instructions?.split(',')
        .map(value => Number(value)) ?? [];

      resolve({ a, b, c, instructions });
    });
  });

  return promise;
};

export { inputParser };