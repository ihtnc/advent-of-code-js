import type { InputData } from "./input-parser";

const solution = async (data: InputData): Promise<number> => {
  const promise = new Promise<number>(async (resolve) => {
    const { reports } = data;
    let count = 0;

    for (let i = 0; i < reports.length; i++) {
      await checkSafety(reports[i])
        .then(() => count++)
        .catch(() => {});
    }

    resolve(count);
  });

  return promise;
};

const checkSafety = async (report: Array<number>): Promise<boolean> => {
  const promise = new Promise<boolean>(async (resolve, reject) => {
    const first = report[0];
    const second = report[1];
    const isAscending = first < second;
    let isReportSafe = true;

    for (let j = 0; j < report.length - 1; j++) {
      const level = report[j];
      const nextLevel = report[j + 1];

      const diff = Math.abs(level - nextLevel);
      if (diff === 0 || diff > 3) {
        isReportSafe = false;
        break;
      }

      if (isAscending && level > nextLevel) {
        isReportSafe = false;
        break;
      }

      if (!isAscending && level < nextLevel) {
        isReportSafe = false;
        break;
      }
    }

    if (isReportSafe) { resolve(true); }
    else { reject(false); }
  });

  return promise;
};

export { solution, checkSafety };