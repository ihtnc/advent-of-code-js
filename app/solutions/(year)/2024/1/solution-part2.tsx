import type { InputData } from "./input-parser";

type Fn = ({ data1, data2 }: InputData) => Promise<number>;

const solution: Fn = async ({ data1, data2 }) => {
  const promise = new Promise<number>(async (resolve) => {
    const task1 = countOccurence(data1);
    const task2 = countOccurence(data2);
    const [counted1, counted2] = await Promise.all([task1, task2]);

    let result = 0;
    for(const key in counted1) {
      const value = Number(key);
      if (counted2[value]) {
        result += value * counted2[key] * counted1[key];
      }
    }
    resolve(result);
  });

  return promise;
};

type OccurenceData = {
  [key: number]: number,
};

type CountFn = (data: Array<number>) => Promise<OccurenceData>;

const countOccurence: CountFn = async (data) => {
  const promise = new Promise<OccurenceData>((resolve) => {
    const counted: OccurenceData = {};

    for (const value of data) {
      if (counted[value]) {
        counted[value] += 1;
      } else {
        counted[value] = 1;
      }
    }

    resolve(counted);
  });

  return promise;
};

export { solution };