import { promises as fs } from 'fs';
import path from 'path';
import type { IInputParser } from '@/actions/advent-of-code';

export async  function getLocalInput<T>(year: number, day: number, fileName: string, parser?: IInputParser<T>): Promise<T> {
  const basePath = 'app/solutions';
  const inputPath = path.join(process.cwd(), basePath, `${year}`, `${day}`, fileName);
  const input = await fs.readFile(inputPath, 'utf8');
  return input && parser ? await parser(input) : (input as unknown as T);
};