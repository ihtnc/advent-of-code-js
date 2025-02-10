export type Rules = {
  [number: number]: Array<number>,
};

export type InputData = {
  rules: Rules,
  updates: Array<Array<number>>,
};

export type ValidityStatus = {
  item: Array<number>,
  isValid: boolean,
};
