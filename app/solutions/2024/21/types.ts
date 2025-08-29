export type InputData = {
  codes: Array<string>,
};

export type Direction = '^' | 'v' | '<' | '>' | 'A';

export type Number = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'A';

export interface IButtonConnection<T extends Number | Direction> {
  direction: Direction,
  button: ButtonFace<T>,
};

export type ButtonFace<T extends Number | Direction> = {
  value: T,
  neighbours: Array<IButtonConnection<T>>,
};