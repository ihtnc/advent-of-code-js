import type { IInputParser } from "@/actions/advent-of-code";

export type Rules = {
  [number: number]: Array<number>,
};

export type InputData = {
  rules: Rules,
  updates: Array<Array<number>>,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    const lines = input.split('\n');
    const rules: Rules = {};
    const updates: Array<Array<number>> = [];

    lines.forEach((line) => {
      if (!line) { return; }

      const ruleMatch = /^(?<num>\d+)\|(?<nxt>\d+)\s*$/g.exec(line);
      if(ruleMatch) {
        const number = ruleMatch.groups?.num;
        const successor = ruleMatch.groups?.nxt;
        const key = Number(number);

        if (rules[key]) {
          rules[key].push(Number(successor));
        } else {
          rules[key] = [Number(successor)];
        }

        return;
      }

      const updateMatch = /^(?:(?:\d+)|,(?:\d+))+\s*$/g.exec(line);
      if (updateMatch) {
        const update = line.split(',').map((num) => Number(num));
        updates.push(update);
      }
    });

    resolve({ rules, updates });
  });

  return promise;
};

export { inputParser };