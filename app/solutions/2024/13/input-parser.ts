import type { IInputParser } from '@/solutions/actions';
import type { Behaviour, InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const matchx = '(?:Button\\s+[ABab]\\s*:\\s*X\\+)';
      const matchy = '(?:\\s*,\\s*Y\\+)';
      const matchpx = '(?:Prize\\s*:\\s*X=)';
      const matchpy = '(?:\\s*,\\s*Y=)';
      const matcha = `${matchx}(?<ax>\\d+)${matchy}(?<ay>\\d+)`;
      const matchb = `${matchx}(?<bx>\\d+)${matchy}(?<by>\\d+)`;
      const matchp = `${matchpx}(?<px>\\d+)${matchpy}(?<py>\\d+)`;
      const regex = `${matcha}(?:\\s+)${matchb}(?:\\s+)${matchp}`;

      const behaviours: Array<Behaviour> = [];

      const regexp = new RegExp(regex, 'g');
      let match: RegExpExecArray | null;
      while(match = regexp.exec(input)) {
        const ax = match.groups?.ax ?? '';
        const ay = match.groups?.ay ?? '';
        const bx = match.groups?.bx ?? '';
        const by = match.groups?.by ?? '';
        const px = match.groups?.px ?? '';
        const py = match.groups?.py ?? '';
        behaviours.push({
          a: { x: BigInt(ax), y: BigInt(ay) },
          b: { x: BigInt(bx), y: BigInt(by) },
          target: { x: BigInt(px), y: BigInt(py) },
        });
      };

      resolve({ behaviours });
    });
  });

  return promise;
};

export { inputParser };