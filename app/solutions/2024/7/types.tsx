export type Test = {
  result: number,
  values: Array<number>,
};

export type InputData = {
  tests: Array<Test>,
};

export enum Operation {
  Sum = '+',
  Product = '*',
  Concat = '||',
  Terminate = '!',
};

export type TestNode = {
  parent: TestNode | null,
  operation: Operation | null,
  value: number,
  level: number,
  result: number,
  sum: TestNode | null,
  product: TestNode | null,
  concat: TestNode | null,
};
