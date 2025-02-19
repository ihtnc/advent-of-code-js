import type { InputData } from "./types";

type Fn =({ data1, data2 }: InputData) => Promise<number>;

const solution: Fn = async ({ data1, data2 }) => {
  const task1 = sort(data1);
  const task2 = sort(data2);
  const [sorted1, sorted2] = await Promise.all([task1, task2]);

  let result = 0;
  for (let i = 0; i < data1.length; i++) {
    result += Math.abs(sorted1[i] - sorted2[i]);
  }
  return result;
};

const sort = async (array: Array<number>): Promise<Array<number>> => {
  const promise = new Promise<Array<number>>((resolve) => {
    setTimeout(() => {
      const sorted = array.sort((a, b) => a - b);
      resolve(sorted);
    });
  });

  return promise;
};

export { solution };