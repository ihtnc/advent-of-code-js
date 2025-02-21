import path from 'path';

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

function getAdventOfCodeInputUrl(year: number, day: number): string {
  const url = getAdventOfCodeUrl(year, day);
  return `${url}/input`;
};

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

export async function getInput(session: string, year: number, day: number) {
  const url = getAdventOfCodeInputUrl(year, day);
  const response = await fetchText(url, {
    headers: getAdventOfCodeHeaders(session),
    next: getAdventOfCodeNextConfig(session),
  });
  return response;
}

const fetchText = async (url: string, options?: RequestInit): Promise<string> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const responseBody = await response.text();
  return responseBody;
}