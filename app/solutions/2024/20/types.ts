export type InputData = {
  map: Array<Array<SymbolType>>,
};

export type Coordinates = {
  x: number,
  y: number,
};

export enum SymbolType {
  WALL = '#',
  EMPTY = '.',
  START = 'S',
  END = 'E',
};

export type Location = {
  coordinates: Coordinates,
  symbol: SymbolType,
  connections: Array<Location>,
};
