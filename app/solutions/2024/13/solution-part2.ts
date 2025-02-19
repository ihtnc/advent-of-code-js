import { findOptimalTokens } from './solution-part1';
import type { Behaviour, InputData } from './types';

type Fn = ({ behaviours }: InputData) => Promise<bigint>;

const solution: Fn = async ({ behaviours }) => {
  let total = 0n;

  const adjusted = adjustBehaviours(behaviours);

  const tasks = [];
  for (const behaviour of adjusted) {
    // check part 1 for findOptimalTokens definition
    tasks.push(findOptimalTokens(behaviour)
      .then((tokens) => total += tokens)
    );
  }

  await Promise.all(tasks);
  return total;
};

type AdjustFn = (behaviours: Array<Behaviour>) => Array<Behaviour>;

const adjustBehaviours: AdjustFn = (behaviours) => {
  const adjusted: Array<Behaviour> = [];

  for (const behaviour of behaviours) {
    const { a, b, target } = behaviour;
    adjusted.push({
      a: { x: a.x, y: a.y },
      b: { x: b.x, y: b.y },
      target: {
        x: target.x + 10000000000000n,
        y: target.y + 10000000000000n,
      },
    });
  }

  return adjusted;
};

export { solution };