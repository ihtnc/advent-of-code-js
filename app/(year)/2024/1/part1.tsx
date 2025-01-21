import type { InputData } from "./input-parser";
import { sort } from "@/utilities";

const solution = async (data: InputData): Promise<number> => {
  const promise = new Promise<number>(async (resolve) => {
    const { data1, data2 } = data;
    const task1 = sort(data1);
    const task2 = sort(data2);
    const [sorted1, sorted2] = await Promise.all([task1, task2]);

    let result = 0;
    for (let i = 0; i < data1.length; i++) {
      result += Math.abs(sorted1[i] - sorted2[i]);
    }

    resolve(result);
  });

  return promise;
};

export { solution };