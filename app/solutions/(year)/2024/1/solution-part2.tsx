import type { InputData } from "./input-parser";

const solution = async (data: InputData): Promise<number> => {
  const promise = new Promise<number>(async (resolve) => {
    const { data1, data2 } = data;
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
  [key: number]: number;
};

const countOccurence = async (data: Array<number>): Promise<OccurenceData> => {
  const promise = new Promise<OccurenceData>((resolve) => {
    const counted: OccurenceData = {};

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

export { solution };