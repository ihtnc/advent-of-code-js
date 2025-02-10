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

export enum PathType {
  Looping = "Looping",
  Terminating = "Terminating",
};

export type Path = {
  move?: Move,
  next?: Path,
};

export type TraversedPath = {
  start: Path,
  type: PathType,
};
