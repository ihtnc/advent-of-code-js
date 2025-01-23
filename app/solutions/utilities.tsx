import { promises as fs } from 'fs';
import path from 'path';
import type { IInputParser } from '@/actions/advent-of-code';

export const sort = async (array: Array<number>): Promise<Array<number>> => {
  const promise = new Promise<Array<number>>((resolve) => {
    const sorted = array.sort((a, b) => a - b);
    resolve(sorted);
  });

  return promise;
};

export async  function getLocalInput<T>(year: number, day: number, fileName: string, parser?: IInputParser<T>): Promise<T> {
  const basePath = 'app/solutions/(year)';
  const inputPath = path.join(process.cwd(), basePath, `${year}`, `${day}`, fileName);
  const input = await fs.readFile(inputPath, 'utf8');
  return input && parser ? await parser(input) : (input as unknown as T);
};