export type InputData = {
  map: Array<Array<SymbolType>>,
  start: Coordinates,
  end: Coordinates,
};

export enum SymbolType {
  WALL = '#',
  EMPTY = '.',
  START = 'S',
  END = 'E',
};

export type Coordinates = {
  x: number,
  y: number,
};

export enum Direction {
  LEFT = 'L',
  RIGHT = 'R',
  UP = 'U',
  DOWN = 'D',
}

export type Connection = {
  direction: Direction,
  path: Location,
}

export type Location = {
  coordinates: Coordinates,
  symbol: SymbolType,
  connections: Array<Connection>,
};

export type Path = {
  connection: Connection,
  value: number,
};

export type TraversedPath = {
  coordinate: Coordinates,
  previous: TraversedPath | null,
};

export type PathQueueItem = {
  item: Path,
  traversed: TraversedPath | null,
};

export type Result = {
  value: number,
  traversed: TraversedPath | null,
};
