import type { InputData } from "./input-parser";
import { checkSafety } from "./solution-part1";

type Fn = ({ reports }: InputData) => Promise<number>;

const solution: Fn = async ({ reports }) => {
  let count = 0;

  for (let i = 0; i < reports.length; i++) {
    let safe = 0;
    const report = reports[i];

    // check part 1 for checkSafety definition
    const main = checkSafety(report)
      .then(() => safe++)
      .catch(() => {});

    const tests = report.map((_, j) => {
      const newReport = [...report];
      newReport.splice(j, 1);
      return checkSafety(newReport)
        .then(() => safe++)
        .catch(() => {});
    });

    await Promise.all([main, ...tests]);

    if (safe > 0) { count++; }
  }

  return count;
};

export { solution };