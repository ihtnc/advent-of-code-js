import type { InputData, Rules } from './types';

type Fn = ({ rules, updates }: InputData) => Promise<number>;

const solution: Fn = async ({ rules, updates }) => {
  const status = await validateAll({ rules, updates });
  const valid = status.filter(({ isValid }) => isValid)
    .map(({ item }) => item);
  const result = calculate(valid);
  return result;
};

type ValidityStatus = {
  item: Array<number>,
  isValid: boolean,
};

type GetFn = ({ rules, updates }: InputData) => Promise<Array<ValidityStatus>>;

const validateAll: GetFn = async ({ rules, updates }) => {
  const status: Array<ValidityStatus> = [];

  for (const item of updates) {
    let isValid = true;

    const tasks = item.map(
      (_, i) => validate(i, item, rules).catch(() => isValid = false)
    );
    await Promise.all(tasks);

    status.push({ item, isValid });
  }

  return status;
};

type ValidateFn = (index: number, update: Array<number>, rules: Rules) => Promise<boolean>;

const validate: ValidateFn = async (index, update, rules) => {
  const promise = new Promise<boolean>(async (resolve, reject) => {
    setTimeout(() => {
      const successors = rules[update[index]] ?? [];
      if (successors.length == 0) { resolve(true); }

      const prev = update.slice(0, index);
      for (const item of prev) {
        if (successors.indexOf(item) >= 0) { return reject(); }
      }

      resolve(true);
    });
  });

  return promise;
};

type CalculateFn = (update: Array<Array<number>>) => number;

const calculate: CalculateFn = (update) => {
  let result = 0;

  for (const item of update) {
    const mid = Math.floor(item.length / 2);
    result += item[mid];
  }

  return result;
};

export { validateAll, calculate, solution };