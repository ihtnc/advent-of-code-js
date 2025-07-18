import { OpCode, Operand, type InputData, type State } from './types';

type Fn = ({ a, b, c, instructions }: InputData) => Promise<string>;

const solution: Fn = async ({ a, b, c, instructions }) => {
  const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
      const state: State = {
        a, b, c,
        pointer: 0,
        output: [],
      };

      run(instructions, state);
      const output = state.output.join(',');
      resolve(output);
    });
  });

  return promise;
};

type RunFn = (instructions: Array<number>, state: State) => void;

const run: RunFn = (instructions, state) => {
  // instructions are always in pairs of opcode and operand
  // opcode is always the first value in the instruction
  // operand is always the next value after the opcode
  const opCodeOffset = 2;
  const operandOffset = 1;

  while (state.pointer >= 0 && state.pointer < instructions.length) {
    if (state.pointer + operandOffset >= instructions.length) { break; }

    const opcode = instructions[state.pointer] as OpCode;
    const operand = instructions[state.pointer + operandOffset] as Operand;

    switch (opcode) {
      case OpCode.ADV:
        runADV(operand, state);
        break;
      case OpCode.BXL:
        runBXL(operand, state);
        break;
      case OpCode.BST:
        runBST(operand, state);
        break;
      case OpCode.JNZ:
        // JNZ does not increment the pointer, it jumps to a new location
        // JNZ jumps only if register A is not zero
        if (state.a === 0) { break; }

        runJNZ(operand, state);
        continue;
      case OpCode.BXC:
        runBXC(operand, state);
        break;
      case OpCode.OUT:
        runOUT(operand, state);
        break;
      case OpCode.BDV:
        runBDV(operand, state);
        break;
      case OpCode.CDV:
        runCDV(operand, state);
        break;
    }

    state.pointer += opCodeOffset;
  }
};

type RunInstructionFn = (operand: Operand, state: State) => void;

const runADV: RunInstructionFn = (operand, state) => {
  const power = getComboOperandValue(operand, state);
  if (power === null) { return; }

  const numerator = state.a;
  const denominator = Math.pow(2, power);
  const result = Math.floor(numerator / denominator);
  state.a = result;
};

const runBXL: RunInstructionFn = (operand, state) => {
  const result = BigInt(state.b) ^ BigInt(operand);
  state.b = Number(result);
};

const runBST: RunInstructionFn = (operand, state) => {
  const value = getComboOperandValue(operand, state);
  if (value === null) { return; }

  const result = value % 8;
  state.b = result;
};

const runJNZ: RunInstructionFn = (operand, state) => {
  const newPointer = Number(operand);
  state.pointer = newPointer;
};

const runBXC: RunInstructionFn = (_, state) => {
  const result = BigInt(state.b) ^ BigInt(state.c);
  state.b = Number(result);
};

const runOUT: RunInstructionFn = (operand, state) => {
  const value = getComboOperandValue(operand, state);
  if (value === null) { return; }

  const output = value % 8;
  state.output.push(output);
};

const runBDV: RunInstructionFn = (operand, state) => {
  const power = getComboOperandValue(operand, state);
  if (power === null) { return; }

  const numerator = state.a;
  const denominator = Math.pow(2, power);
  const result = Math.floor(numerator / denominator);
  state.b = result;
};

const runCDV: RunInstructionFn = (operand, state) => {
  const power = getComboOperandValue(operand, state);
  if (power === null) { return; }

  const numerator = state.a;
  const denominator = Math.pow(2, power);
  const result = Math.floor(numerator / denominator);
  state.c = result;
};

type GetOperandValueFn = (operand: number, state: State) => number | null;

const getComboOperandValue: GetOperandValueFn = (operand, state) => {
  switch (operand) {
    case Operand.Operand0:
    case Operand.Operand1:
    case Operand.Operand2:
    case Operand.Operand3:
      return operand;
    case Operand.Operand4: return state.a;
    case Operand.Operand5: return state.b;
    case Operand.Operand6: return state.c;
    default: return null;
  }
}

export { solution, run };