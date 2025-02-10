export enum Marker {
  Obstacle = '#',
  Guard = 'G',
  Empty = '.',
  Visited = 'x',
};

export enum Direction {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

export type Move = {
  x: number,
  y: number,
  direction: Direction,
};

export type InputData = {
  map: Array<Array<Marker>>,
  guard: Move,
};
