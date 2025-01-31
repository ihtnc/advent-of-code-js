import type { IInputParser } from "@/actions/advent-of-code";

export enum Marker {
  Obstacle = '#',
  Guard = 'G',
  Empty = '.',
  Visited = 'x',
};

export enum Direction {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

export type Move = {
  x: number,
  y: number,
  direction: Direction,
};

export type InputData = {
  map: Array<Array<Marker>>,
  guard: Move,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const map: Array<Array<Marker>> = [];
      const guard: Move = {
        x: 0,
        y: 0,
        direction: Direction.Up,
      };

      for (const line of lines) {
        if (!line) { continue; }

        const match = /(?<details>[.#^v<>]+)\s*/g.exec(line);
        if (!match) { continue; }

        const details = match.groups?.details ?? '';
        const section = details.split('') as Array<Marker>;

        const guardMatch = /[<>^v]/g.exec(details);
        if (guardMatch) {
          const direction = guardMatch[0] as Direction;
          guard.x = guardMatch.index;
          guard.y = map.length;
          guard.direction = direction;

          section[guard.x] = Marker.Guard;
        }

        map.push(section);
      }

      resolve({ map, guard });
    });
  });

  return promise;
};

export { inputParser };