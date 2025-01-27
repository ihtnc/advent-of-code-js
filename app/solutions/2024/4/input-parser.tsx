import type { IInputParser } from "@/actions/advent-of-code";

export type InputData = {
  lines: Array<string>,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    const lines = input.split('\n');
    resolve({ lines });
  });

  return promise;
};

export { inputParser };