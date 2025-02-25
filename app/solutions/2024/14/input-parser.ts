import type { IInputParser } from '@/solutions/actions';
import type { InputData, Robot } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');

      const robots: Array<Robot> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const regexp = new RegExp(/^\s*p\s*=\s*(?<px>\d+)\s*,\s*(?<py>\d+)\s+v\s*=\s*(?<vx>-?\d+)\s*,\s*(?<vy>-?\d+)/, 'gm');
        const match = regexp.exec(line);
        if (!match) { continue; }

        const px = match.groups?.px ?? '0';
        const py = match.groups?.py ?? '0';
        const vx = match.groups?.vx ?? '0';
        const vy = match.groups?.vy ?? '0';
        if (!px || !py || !vx || !vy) { continue; }

        const robot: Robot = {
          position: {
            x: Number(px),
            y: Number(py),
          },
          velocity: {
            x: Number(vx),
            y: Number(vy),
          },
        };

        robots.push(robot);
      }

      resolve({ robots });
    });
  });

  return promise;
};

export { inputParser };