import { fetchText } from './index';

export function getAdventOfCodeUrl(year?: number, day?: number): string {
  let url = 'https://adventofcode.com';
  if (year) {
    url += `/${year}`;
    url += `${day ? `/day/${day}` : ''}`;
  }
  return url;
};

export function getAdventOfCodeInputUrl(year: number, day: number): string {
  const url = getAdventOfCodeUrl(year, day);
  return `${url}/input`;
};

export interface IInputParser<T> {
  (input: string): Promise<T>;
};

export async function getInput<T>(session: string, year: number, day: number, useLocal: boolean = false, parser?: IInputParser<T>): Promise<T> {
  const input = useLocal ? await fetchLocalInput(session, year, day): await fetchChallengeInput(session, year, day);
  return input && parser ? await parser(input) : (input as unknown as T);
}

interface IFetchInput {
  (session: string, year: number, day: number): Promise<string>;
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

const fetchChallengeInput: IFetchInput = async (session: string, year: number, day: number) => {
  const url = getAdventOfCodeInputUrl(year, day);
  const response = await fetchText(url, {
    headers: getAdventOfCodeHeaders(session),
    next: getAdventOfCodeNextConfig(session),
  });
  return response;
}

const fetchLocalInput: IFetchInput = async () => {
  //const response = await fs.readFile(`./(year)/${year}/${day}/input.txt`, 'utf-8');
  const response = '';
  return response;
}