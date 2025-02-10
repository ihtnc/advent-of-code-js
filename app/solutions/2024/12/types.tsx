export type InputData = {
  map: Array<Array<string>>,
};

export type Plot = {
  plant: string,
  top?: Plot,
  bottom?: Plot,
  left?: Plot,
  right?: Plot,
};
