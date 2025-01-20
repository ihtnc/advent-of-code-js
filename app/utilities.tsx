export const sort = async (array: Array<number>): Promise<Array<number>> => {
  const promise = new Promise<Array<number>>((resolve) => {
    const sorted = array.sort((a, b) => a - b);
    resolve(sorted);
  });

  return promise;
};