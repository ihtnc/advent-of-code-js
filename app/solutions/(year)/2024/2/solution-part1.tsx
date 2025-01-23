import type { InputData } from "./input-parser";

type Fn = ({ reports }: InputData) => Promise<number>;

const solution: Fn = async ({ reports }) => {
  const promise = new Promise<number>(async (resolve) => {
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

type CheckFn = (report: Array<number>) => Promise<boolean>;

const checkSafety: CheckFn = async (report) => {
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