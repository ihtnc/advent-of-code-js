export type Solution = {
  year: number,
  problems: Array<Problem>,
};

type Problem = {
  day: number,
  stars: number,
}