export type InputData = {
  map: Array<Array<number>>,
};

export type Trail = {
  height: number,
  top?: Trail,
  bottom?: Trail,
  left?: Trail,
  right?: Trail,
};

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
};

export type Path = {
  trail: Trail,
  next?: Path,
  direction?: Direction,
  visited?: boolean,
};
