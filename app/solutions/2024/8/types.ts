export type Coordinates = {x: number, y: number};

export type Antennae = {
  [id: string]: Array<Coordinates>,
};

export type Map = {
  rows: number,
  cols: number,
};

export type InputData = {
  map: Map,
  antennae: Antennae,
};
