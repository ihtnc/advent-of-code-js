import type { IInputParser } from "@/actions/advent-of-code";
import type { IData } from "./types";

export const inputParser: IInputParser<IData> = async (input: string) => {
  const lines = input.split('\n');
  const data1: Array<number> = [];
  const data2: Array<number> = [];

  const promise = new Promise<IData>((resolve) => {
    lines.forEach((line) => {
      if (!line) { return; }

      const numbers = line.split(/\s+/);
      if (numbers.length !== 2) { return; }

      data1.push(parseInt(numbers[0], 10));
      data2.push(parseInt(numbers[1], 10));
    });

    resolve({ data1, data2 });
  });

  return promise;
};

type IOccurenceData = {
  [key: number]: number;
};

export const countOccurence = async (data: Array<number>): Promise<IOccurenceData> => {
  const promise = new Promise<IOccurenceData>((resolve) => {
    const counted: IOccurenceData = {};

    data.forEach((value) => {
      if (counted[value]) {
        counted[value] += 1;
      } else {
        counted[value] = 1;
      }
    });

    resolve(counted);
  });

  return promise;
};