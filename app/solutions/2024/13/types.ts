export type InputData = {
  behaviours: Array<Behaviour>,
};

export type Behaviour = {
  a: Coordinates,
  b: Coordinates,
  target: Coordinates,
};

type Coordinates = {
  x: bigint,
  y: bigint,
};

export type GCD = {
  gcd: bigint,
  coefficient: Coefficient,
};

export type Coefficient = {
  a0: bigint,
  b0: bigint,
};

export type Segment = {
  point1: Coefficient,
  point2: Coefficient,
};