import type { InputData, Rules, UniqueStones } from './types';

type Fn = ({ stones }: InputData) => Promise<number>;

const solution: Fn = async ({ stones }) => {
  const blinks = 25;
  const response = await blink(stones, blinks);
  return response;
};

type BlinkFn = (stones: Array<string>, count: number) => Promise<number>;

const blink: BlinkFn = async (stones, count) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      let total = 0;

      const rules: Rules = {};
      for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        const result = calculateStones(stone, rules, count);
        total += result;
      }

      resolve(total);
    });
  });

  return promise;
};

type CalculateFn = (stone: string, rules: Rules, count: number) => number;

const calculateStones: CalculateFn = (stone, rules, count) => {
  if (!stone) { return 0; }

  let depth = count;
  let current: UniqueStones = {
    [stone]: 1,
  };

  while (depth > 0) {
    const next = getNextStones(current, rules);
    current = next;
    depth--;
  }

  let total = 0;
  for (const stone in current) {
    if (!stone) { continue; }

    const count = current[stone];
    if (count <= 0) { continue; }

    total += count;
  }

  return total;
};

type GetNextFn = (stones: UniqueStones, rules: Rules) => UniqueStones;

const getNextStones: GetNextFn = (stones, rules) => {
  const next: UniqueStones = {};

  for (const stone in stones) {
    if (!stone) { continue; }

    if (!rules[stone]) { applyRules(stone, rules); }

    const parentCount = stones[stone];
    for (const child of rules[stone]) {
      if (!next[child]) { next[child] = 0; }
      next[child] += parentCount;
    }
  }

  return next;
}

type ApplyFn = (stone: string,  rules: Rules) => void;

const applyRules: ApplyFn = (stone, rules) => {
  if (!stone || rules[stone]) { return; }

  const children: Array<string> = [];
  if (stone === '0') {
    children.push('1');
  } else if (stone.length % 2 === 0) {
    const half = stone.length / 2;
    const firstHalf = stone.substring(0, half).replace(/^0+(?=[0-9])/g, '');
    const secondHalf = stone.substring(half).replace(/^0+(?=[0-9])/g, '');
    children.push(firstHalf);
    children.push(secondHalf);
  } else {
    children.push(`${Number(stone) * 2024}`);
  }
  rules[stone] = children;
};

export { solution, blink };