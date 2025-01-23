import path from 'path';
import { fetchExternalText } from './index';

export function getAdventOfCodeUrl(year?: number, day?: number): string {
  const baseUrl = new URL('https://adventofcode.com');
  const paths = [];

  if (year) {
    paths.push(`${year}`);

    if (day) {
      paths.push('day');
      paths.push(`${day}`);
    }
  }

  baseUrl.pathname = path.join(...paths);
  return baseUrl.toString();
};

export function getAdventOfCodeInputUrl(year: number, day: number): string {
  const url = getAdventOfCodeUrl(year, day);
  return `${url}/input`;
};

export interface IInputParser<T> {
  (input: string): Promise<T>;
};

export async function getInput<T>(session: string, year: number, day: number, parser?: IInputParser<T>): Promise<T> {
  const input = await fetchChallengeInput(session, year, day);
  return input && parser ? await parser(input) : (input as unknown as T);
}

const getAdventOfCodeHeaders = (session: string) => ({
  cookie: `session=${session}`,
  'User-Agent': 'github.com/ihtnc/advent-of-code-js by ihopethisnamecounts@yahoo.com',
});

const getAdventOfCodeNextConfig = (session: string) => {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  return {
    tags: [session, key],
  };
};

const fetchChallengeInput = async (session: string, year: number, day: number) => {
  const url = getAdventOfCodeInputUrl(year, day);
  const response = await fetchExternalText(url, {
    headers: getAdventOfCodeHeaders(session),
    next: getAdventOfCodeNextConfig(session),
  });
  return response;
}