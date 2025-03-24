export type InputData = {
  map: Array<Array<SymbolType>>,
  initial: Coordinates,
  instructions: Array<Direction>,
};

export enum SymbolType {
  WALL = '#',
  EMPTY = '.',
  BOX = 'O',
  ROBOT = '@',
  BOX_START = '[',
  BOX_END = ']',
};

export type Coordinates = {
  x: number,
  y: number,
};

export enum Direction {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>',
};