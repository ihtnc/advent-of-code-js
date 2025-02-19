import { calculatePrice, convert, getGroup, groupPlots, setVisited } from './solution-part1';
import type { InputData, Plot } from './types';

type Fn = ({ map }: InputData) => Promise<number>;

const solution: Fn = async ({ map: input }) => {
  let total = 0;

  // check part 1 for convert definition
  const map = convert(input);

  // check part 1 for groupPlots definition
  groupPlots(map);

  const visited = new Set<Plot>();
  const tasks = [];
  for (const line of map) {
    for (const plot of line) {
      if (visited.has(plot)) { continue; }

      // check part 1 for getGroup definition
      const group = getGroup(plot);

      // check part 1 for setVisited definition
      setVisited(group, visited);

      // check part 1 for calculatePrice definition
      tasks.push(calculatePrice(group, true)
        .then((result) => { total += result; })
      );
    }
  }

  await Promise.all(tasks);

  return total;
};

export { solution };