import type { InputData } from './types';

type Fn = ({ patterns, designs }: InputData) => Promise<number>;

const solution: Fn = async (data) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const patterns = new Set<string>();
      for (const pattern of data.patterns) {
        patterns.add(pattern);
      }

      const result: Array<string> = [];

      const designCache = new Map<string, number>();
      for (const design of data.designs) {
        if (countPossiblePatterns(patterns, design, designCache) > 0) {
          result.push(design);
        }
      }
      return resolve(result.length);
    });
  });

  return promise;
};

type CountFn = (patterns: Set<string>, design: string, cache: Map<string, number>) => number;

const countPossiblePatterns: CountFn = (patterns, design, cache) => {
  if (design === '') { return 1; }
  if (cache.has(design)) { return cache.get(design)!; }

  let totalCombinations = 0;
  for (let length = 1; length <= design.length; length++) {
    const prefix = design.slice(0, length);
    if (patterns.has(prefix)) {
      const remaining = design.slice(length);
      totalCombinations += countPossiblePatterns(patterns, remaining, cache);
    }
  }

  cache.set(design, totalCombinations);
  return totalCombinations;
};

export { solution, countPossiblePatterns };