import type { InputData, Test } from './input-parser';

type Fn = ({ tests }: InputData) => Promise<number>;

const solution: Fn = async ({ tests }) => {
  const tasks = [];
  const solved: Array<Test> = [];
  for (const test of tests) {
    tasks.push(findSolvedTest(test, calculate)
      .then(() => { solved.push(test); })
      .catch(() => {})
    );
  }

  await Promise.all(tasks);

  let sum = 0;
  for (const test of solved) { sum += test.result; }
  return sum;
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

type FindFn = (test: Test, calculate: CalculateFn) => Promise<boolean>;

const findSolvedTest: FindFn = ({result, values}, calculate) => {
  const promise = new Promise<boolean>(async (resolve, reject) => {
    setTimeout(() => {
      if (values.length <= 0) { return reject(); }

      let currentNode = calculate(values);
      if (!currentNode) { return reject(); }

      while (currentNode) {
        const { level: currentLevel, result: currentResult } = currentNode;
        if (currentLevel === values.length - 1 && currentResult === result) {
          return resolve(true);
        }

        currentNode = calculate(values, currentNode);
      }

      return reject();
    });
  });

  return promise;
};

export type CalculateFn = (values: Array<number>, node?: TestNode | null) => TestNode | null;

const calculate: CalculateFn = (values, node = null) => {
  if (!node) {
    const rootNode = createTestNode(values, null, null);
    return rootNode;
  }

  if (!node.sum) {
    const sumNode = createTestNode(values, node, Operation.Sum);
    node.sum = sumNode;
    return sumNode?.operation === Operation.Terminate ? node.parent : sumNode;
  }

  if (!node.product) {
    const productNode = createTestNode(values, node, Operation.Product);
    node.product = productNode;
    return productNode?.operation === Operation.Terminate ? node.parent : productNode;
  }

  return node.parent;
};

type CreateFn = (values: Array<number>, parent?: TestNode | null, op?: Operation | null) => TestNode | null;

/*
Each value on the input corresponds to it's own level in the tree.
Each node in the level has:
  - a reference to its parent (if any)
  - the current value
      - i.e.: the value of the root node corresponds to the first number in the input
        and the value of the nodes in the next level correspond to the second number in the input
  - the result of it's operation in relation to it's parent
      - i.e.: if operation is add, then result is the sum of the parent node's own result value
        and the current node's value
  - a reference to 3 possible operations for the next number: add, multiply, or concatenate
The tree then represents all possible combinations of operations for the input values.
This function creates a new node based on these rules.
*/
const createTestNode: CreateFn = (values, parent = null, op = null) => {
  const parentLevel = parent?.level ?? -1;
  const level = parentLevel + 1;

  if (level >= values.length) {
    return {
      parent,
      operation: Operation.Terminate,
      value: 0,
      level,
      result: 0,
      sum: null,
      product: null,
      concat: null,
    };;
  }

  const value = values[level];
  const parentResult = parent?.result ?? 0;

  let result = 0;
  switch (op) {
    case Operation.Sum:
      result = parentResult + value;
      break;
    case Operation.Product:
      result = parentResult * value;
      break;
    case Operation.Concat:
        result = Number(`${parentResult}${value}`);
        break;
    default:
      result = value;
      break;
  }

  return {
    parent,
    operation: op,
    value,
    level,
    result,
    sum: null,
    product: null,
    concat: null,
  };
};

export { solution, findSolvedTest, createTestNode };