import type { InputData, Rules } from './input-parser';
import { validateAll, calculate } from './solution-part1';

type Fn = ({ rules, updates }: InputData) => Promise<number>;

const solution: Fn = async ({ rules, updates }) => {
  const promise = new Promise<number>(async (resolve) => {
    // check part 1 for validateAll definition
    const status = await validateAll({ rules, updates });
    const invalid = status.filter(({ isValid }) => !isValid)
      .map(({ item }) => item);

    const valid = await applyRulesAll(invalid, rules);

    // check part 1 for calculate definition
    const result = calculate(valid);
    resolve(result);
  });

  return promise;
};

type ApplyAllFn = (updates: Array<Array<number>>, rules: Rules) => Promise<Array<Array<number>>>;

const applyRulesAll: ApplyAllFn = async (updates, rules) => {
  const promise = new Promise<Array<Array<number>>>(async (resolve) => {
    const tasks = updates.map((item) => applyRules(item, rules));
    const result = await Promise.all(tasks);
    resolve(result);
  });

  return promise;
}

type ApplyFn = (update: Array<number>, rules: Rules) => Promise<Array<number>>;

const applyRules: ApplyFn = (update, rules) => {
  const promise = new Promise<Array<number>>(async (resolve) => {
    let latest = update;
    for (let i = 0; i < update.length; i++) {
      const successors = rules[update[i]] ?? [];
      if (successors.length == 0) { continue; }

      const prev = latest.slice(0, i);
      const current = latest[i];
      const newPrev: Array<number> = [];
      const newNext = latest.slice(i + 1);

      for (let j = prev.length - 1; j >= 0; j--) {
        const item = prev[j];
        if (successors.indexOf(item) >= 0) {
          newNext.unshift(item);
        } else {
          newPrev.unshift(item);
        }
      }

      latest = [...newPrev, current, ...newNext];
    }

    resolve(latest);
  });

  return promise;
}

export { solution };