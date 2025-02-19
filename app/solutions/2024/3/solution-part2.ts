import { convert } from "./solution-part1";

type Fn = (input: string) => Promise<number>;

const solution: Fn = async (input) => {
  // check part 1 for convert definition
  const { instructions } = await convert(input, false);

  let sum = 0;
  for (const instruction of instructions) {
    sum += instruction.data1 * instruction.data2;
  }

  return sum;
};

export { solution };