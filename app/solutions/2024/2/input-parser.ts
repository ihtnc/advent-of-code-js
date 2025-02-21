import type { IInputParser } from '@/solutions/actions';
import type { InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>((resolve) => {
    setTimeout(() => {
      const lines = input.split('\n');
      const reports: Array<Array<number>> = [];

      for (const line of lines) {
        if (!line) { continue; }

        const levels: Array<number> = [];
        const regexp = new RegExp(/(?<level>\d+)/, 'g');

        let match: RegExpExecArray | null;
        while(match = regexp.exec(line)) {
          const level = match.groups?.level;
          if (!level) { continue; }
          levels.push(Number(level));
        };

        reports.push(levels);
      }

      resolve({ reports });
    });
  });

  return promise;
};

export { inputParser };