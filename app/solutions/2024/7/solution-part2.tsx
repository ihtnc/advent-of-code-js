import type { InputData, Test } from './input-parser';
import { type CalculateFn, Operation, createTestNode, findSolvedTest } from './solution-part1';

type Fn = ({ tests }: InputData) => Promise<number>;

const solution: Fn = async ({ tests }) => {
  const tasks = [];
  const solved: Array<Test> = [];
  for (const test of tests) {
    // check part 1 for findSolvedTest definition
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

const calculate: CalculateFn = (values, node = null) => {
  if (!node) {
    // check part 1 for createTestNode definition
    const rootNode = createTestNode(values, null, null);
    return rootNode;
  }

  if (!node.sum) {
    const sumNode = createTestNode(values, node, Operation.Sum);
    node.sum = sumNode;
    return sumNode?.operation === Operation.Terminate ? node : sumNode;
  }

  if (!node.product) {
    const productNode = createTestNode(values, node, Operation.Product);
    node.product = productNode;
    return productNode?.operation === Operation.Terminate ? node.parent : productNode;
  }

  if (!node.concat) {
    const concatNode = createTestNode(values, node, Operation.Concat);
    node.concat = concatNode;
    return concatNode?.operation === Operation.Terminate ? node.parent : concatNode;
  }

  return node.parent;
};

export { solution };