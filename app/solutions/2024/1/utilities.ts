type SortFn = (array: Array<number>) => Promise<Array<number>>;

export const sort: SortFn = async (array) => {
  const promise = new Promise<Array<number>>((resolve) => {
    setTimeout(() => {
      const sorted = array.sort((a, b) => a - b);
      resolve(sorted);
    });
  });

  return promise;
};