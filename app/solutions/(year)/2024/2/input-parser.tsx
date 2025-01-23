import type { IInputParser } from "@/actions/advent-of-code";

export type InputData ={
  reports: Array<Array<number>>,
};

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>((resolve) => {
    const lines = input.split('\n');
    const reports: Array<Array<number>> = [];

    lines.forEach((line) => {
      if (!line) { return; }

      const values = line.split(/\s+/);
      if (values.length === 0) { return; }

      const levels: Array<number> = [];
      values.forEach((level) => levels.push(Number(level)));

      reports.push(levels);
    });

    resolve({ reports });
  });

  return promise;
};

export { inputParser };