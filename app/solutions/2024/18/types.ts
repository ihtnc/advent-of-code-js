export type InputData = {
  coordinates: Array<Coordinates>
};

export type Coordinates = {
  x: number,
  y: number,
};

export type Options = {
  map: Array<Array<SymbolType>>,
  start: Coordinates,
  end: Coordinates,
  batchSize: number
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

export type PathNode = {
  location: Location,
  step: number,
  weightedStep: number,
  parent: PathNode | null,
};