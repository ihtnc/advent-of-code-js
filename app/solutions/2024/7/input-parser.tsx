import type { IInputParser } from "@/actions/advent-of-code";

export type Test = {
  result: number,
  values: Array<number>,
};

export type InputData = {
  tests: Array<Test>,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const tests: Array<Test> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const testMatch = /^(?<result>\d+)\s*:\s*(?<values>.+)/g.exec(line);
        if(testMatch) {
          const groupResult = testMatch.groups?.result;
          if (!groupResult) { continue; }
          const result = Number(groupResult);

          const values: Array<number> = [];
          const groupValues = testMatch.groups?.values ?? '';
          const valueRegexp = new RegExp(/(?<value>\d+)\s*/, 'g');
          let valueMatch: RegExpExecArray | null;
          while(valueMatch = valueRegexp.exec(groupValues)) {
            const groupValue = valueMatch.groups?.value;
            if (!groupValue) { continue; }
            values.push(Number(groupValue));
          }

          if (values.length == 0) { continue; }
          tests.push({ result, values });
        }
      }

      resolve({ tests });
    });
  });

  return promise;
};

export { inputParser };