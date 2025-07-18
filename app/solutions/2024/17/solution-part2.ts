import { run } from './solution-part1';
import { type InputData, type State } from './types';

type Fn = ({ a, b, c, instructions }: InputData) => Promise<number>;

const solution: Fn = async ({ a, b, c, instructions }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const output = findSelfReplicatingValue({ a, b, c, instructions });
      resolve(output ?? 0);
    });
  });

  return promise;
};

type FindFn = (input: InputData) => number | null;

// initial brute force of register A values
//   suggests that the values at the start of the output
//   don't change as much as the ones at the end
// this suggests that the higher bits in the register A value
//   correspond to the earlier values in the output
//   and the lower bits to the later ones
// further analysis also reveals that each output corresponds to 3 bits of register A
// so the solution must be to find the corresponding bits to match a certain output
//   and combining them to form the final value for register A
const findSelfReplicatingValue: FindFn = ({ b, c, instructions }) => {
  const input: InputData = {
    a: 0, b, c, instructions,
  };

  const value = findMatchingRegisterAValue(input, instructions.length - 1);
  return value;
};


type FindMatch = (input: InputData, targetInstructionIndex: number) => number | null;

// a pattern soon became apparent and an answer was found (but higher than expected)
// also, further pattern analysis on the bits has some unexplained behaviour
//   but switching to octal instead of binary made the behaviour consistent
//   (octal because the max value of the output is 7)
// so the final solution is to find the octal that corresponds to the last instruction
//   then finding the next octal that when combined with the previous octal
//   will result in an output that matches the last 2 values of the instructions
//   then repeating this process until the output fully matches the instructions
// there are cases where the output cannot be matched mid way through
//   so there needs to be a way for the solution to back track to the previous octal
//   and start looking for another possible value starting from that octal
const findMatchingRegisterAValue: FindMatch = (
  { a, b, c, instructions },
  targetInstructionIndex
) => {
  if (targetInstructionIndex < 0 || targetInstructionIndex > instructions.length) {
    return null;
  }

  const maxValue = 7; // max value in the output is 7
  const target = instructions[targetInstructionIndex];
  const outputIndexOffset = instructions.length - targetInstructionIndex;
  const baseValue = a.toString(8);

  for (let i = 0n; i <= maxValue; i++) {
    const value = BigInt(`0o${baseValue}${i}`);
    const input: InputData = {
      a: Number(value), b, c, instructions,
    };
    const result = getOutput(input);
    const outputIndex = result.output.length - outputIndexOffset;
    const actual = result.output[outputIndex];

    if (actual === target) {
      // this function is recursively called when a match is found
      //   which ensures that previous instructions always match the corresponding output
      // so when a match is found for the current instruction
      //   and the output is as long as the instructions,
      //   then the output matches the instructions exactly and the answer is found
      if (result.output.length === instructions.length) {
        return input.a;
      }

      // move to the previous instruction
      //   and try to find a value for register A that results in an output
      //   that matches the corresponding values in the instructions
      const next = findMatchingRegisterAValue(input, targetInstructionIndex - 1);
      if (next !== null) { return next; }

      // if no match is found, continue searching for a different value
    }
  }

  return null;
};

type GetOutputFn = ({ a, b, c, instructions }: InputData) => State;

const getOutput: GetOutputFn = ({ a, b, c, instructions }) => {
  const state: State = {
    a,
    b,
    c,
    pointer: 0,
    output: [],
  };

  // check part 1 for run definition
  run(instructions, state);
  return state;
};

export { solution };