import type { InputData } from './types';
import { blockInvalidPaths, convert, find, findSummit } from './solution-part1';

type Fn = ({ map }: InputData) => Promise<number>;

const solution: Fn = async ({ map: input }) => {
  // check part 1 for convert definition
  const map = convert(input);

  // check part 1 for blockInvalidPaths definition
  blockInvalidPaths(map);

  // check part 1 for find definition
  const trailHeads = find(map, 0);

  const tasks = [];
  let totalScore = 0;
  for (const trailHead of trailHeads) {
    // check part 1 for findSummit definition
    tasks.push(findSummit(trailHead, true)
      .then((paths) => { totalScore += paths.length; })
    );
  }
  await Promise.all(tasks);

  return totalScore;
};

export { solution };