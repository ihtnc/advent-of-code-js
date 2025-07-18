export type InputData = {
  a: number,
  b: number,
  c: number,
  instructions: Array<number>,
};

export enum OpCode {
  ADV = 0b000,
  BXL = 0b001,
  BST = 0b010,
  JNZ = 0b011,
  BXC = 0b100,
  OUT = 0b101,
  BDV = 0b110,
  CDV = 0b111,
};

export enum Operand {
  Operand0 = 0b000,
  Operand1 = 0b001,
  Operand2 = 0b010,
  Operand3 = 0b011,
  Operand4 = 0b100,
  Operand5 = 0b101,
  Operand6 = 0b110,
  Operand7 = 0b111,
};

export type State = {
  a: number,
  b: number,
  c: number,
  pointer: number,
  output: Array<number>,
};