import { countPossiblePatterns } from './solution-part1';
import type { InputData } from './types';

type Fn = ({ patterns, designs }: InputData) => Promise<number>;

const solution: Fn = async (data) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const patterns = new Set<string>();
      for (const pattern of data.patterns) {
        patterns.add(pattern);
      }

      let total = 0;

      const designCache = new Map<string, number>();
      for (const design of data.designs) {
        // check part 1 for countPossiblePatterns definition
        const result = countPossiblePatterns(patterns, design, designCache);
        total += result;
      }
      return resolve(total);
    });
  });

  return promise;
};

export { solution };