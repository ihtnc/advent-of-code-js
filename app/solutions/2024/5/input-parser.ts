import type { IInputParser } from '@/solutions/actions';
import type { InputData, Rules } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const rules: Rules = {};
      const updates: Array<Array<number>> = [];

      for (const line of lines) {
        if (!line) { continue; }

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

          continue;
        }

        const updateMatch = /^(?:(?:\d+)|,(?:\d+))+\s*$/g.exec(line);
        if (updateMatch) {
          const update = line.split(',').map((num) => Number(num));
          updates.push(update);
        }
      }

      resolve({ rules, updates });
    });
  });

  return promise;
};

export { inputParser };