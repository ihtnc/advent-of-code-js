import type { IInputParser } from "@/actions/advent-of-code";
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      resolve({ lines });
    });
  });

  return promise;
};

export { inputParser };