import type { IData } from "./types";
import { countOccurence } from "./utilities";

async function Solution(data: IData): Promise<number> {
  const promise = new Promise<number>(async (resolve) => {
    const { data1, data2 } = data;
    const task1 = countOccurence(data1);
    const task2 = countOccurence(data2);
    const [counted1, counted2] = await Promise.all([task1, task2]);

    let result = 0;
    for(const key in counted1) {
      const value = parseInt(key, 10);
      if (counted2[value]) {
        result += value * counted2[key] * counted1[key];
      }
    }
    resolve(result);
  });

  return promise;
};

export default Solution;