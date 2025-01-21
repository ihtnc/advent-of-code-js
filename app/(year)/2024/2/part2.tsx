import type { InputData } from "./input-parser";
import { checkSafety } from "./part1";

const solution = async (data: InputData): Promise<number> => {
  const promise = new Promise<number>(async (resolve) => {
    const { reports } = data;
    let count = 0;

    for (let i = 0; i < reports.length; i++) {
      let safe = 0;
      const report = reports[i];
      const tasks = [];

      // check part 1 for checkSafety definition
      tasks.push(checkSafety(report)
        .then(() => safe++)
        .catch(() => {})
      );

      for (let j = 0; j < report.length; j++) {
        const newReport = [...report];
        newReport.splice(j, 1);
        tasks.push(checkSafety(newReport)
          .then(() => safe++)
          .catch(() => {})
        );
      }

      await Promise.all(tasks);

      if (safe > 0) { count++; }
    }

    resolve(count);
  });

  return promise;
};

export { solution };