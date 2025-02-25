export type InputData = {
  robots: Array<Robot>,
};

export type Robot = {
  position: Coordinate,
  velocity: Coordinate,
};

export type Coordinate = {
  x: number,
  y: number,
}

export type Size = {
  width: number,
  height: number,
};