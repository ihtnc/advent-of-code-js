import type { InputData } from './types';
import { blink } from './solution-part1';

type Fn = ({ stones }: InputData) => Promise<number>;

const solution: Fn = async ({ stones }) => {
  const blinks = 75;
  // check part 1 for blink definition
  const response = await blink(stones, blinks);
  return response;
};

export { solution };