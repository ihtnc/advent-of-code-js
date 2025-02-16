import { promises as fs } from "fs";
import path from 'path';

function getCodeBasePath(): string {
  return 'app/components/solution-details/code';
};

function getCodeFullPath(year: string, day: string, part: string): string {
  const basePath = getCodeBasePath();
  const fullPath = path.join(process.cwd(), basePath, year, day, `solution-part${part}.txt`);
  return fullPath;
};

export async function getCode(year: number, day: number, part: number): Promise<string> {
  if(!year || !day || !part) { return ''; }

  const codePath = getCodeFullPath(`${year}`, `${day}`, `${part}`);
  const contents = await fs.readFile(codePath, 'utf8');

  // remove import/export/type definition codes
  const importRegex = /^import[\w{}\s,]+from[^;]+;\s*/gm
  const exportRegex = /^export(?:[^;{}]+|[^{]+{[^}]+}\s*);\s*/gm;
  const typeRegex = /^type[^=]+=[^;]+;\s*/gm;
  const enumRegex = /^enum[^;]+;\s*/gm;
  const interfaceRegex = /^interface[^;]+;\s*/gm;
  const cleaned = contents.replace(importRegex, '')
    .replace(exportRegex, '')
    .replace(typeRegex, '')
    .replace(interfaceRegex, '')
    .replace(enumRegex, '');

  return cleaned;
};

function getTypesFullPath(year: string, day: string): string {
  const basePath = getCodeBasePath();
  const fullPath = path.join(process.cwd(), basePath, year, day, `types.txt`);
  return fullPath;
};

export async function getTypes(year: number, day: number): Promise<string> {
  if(!year || !day) { return ''; }

  const codePath = getTypesFullPath(`${year}`, `${day}`);
  const contents = await fs.readFile(codePath, 'utf8');

  // remove import definition codes
  const importRegex = /^import[\w{}\s,]+from[^;]+;\s*/gm
  const exportRegex = /^export\s+(?=type|enum|interface)/gm
  const cleaned = contents.replace(importRegex, '')
    .replace(exportRegex, '');
  return cleaned;
};

type Group = {
  year: number,
  days: Array<Item>,
};

type Item = {
  day: number,
  parts: Array<number>,
}

export async function getCodeList(filterYear?: number) {
  const list: Array<Group> = [];

  const basePath = getCodeBasePath();
  const years = await fs.readdir(basePath);

  for(const year of years) {
    if (filterYear && year !== `${filterYear}`) { continue; }

    const group: Group = {
      year: Number(year),
      days: [],
    };

    const file = path.join(basePath, year);
    const days = await fs.readdir(file);

    for(const day of days) {
      const parts = await fs.readdir(path.join(file, day));
      const item: Item = {
        day: Number(day),
        parts: parts
          .filter(part => part.startsWith('solution-part'))
          .map(part => Number(part.replace('solution-part', '').replace('.txt', ''))),
      };

      group.days.push(item);
    }

    group.days.sort((a, b) => a.day - b.day);
    list.push(group);
  }

  list.sort((a, b) => b.year - a.year);
  return list;
};

type Solution = {
  year: number,
  problems: Array<Problem>,
};

type Problem = {
  day: number,
  stars: number,
}

export async function getSolutions(): Promise<Array<Solution>> {
  return getCodeList().then((list) =>
    list.map((group) => {
      return {
        year: group.year,
        problems: group.days.map((item) => {
          return {
            day: item.day,
            stars: item.parts.length,
          };
        }),
      };
    })
  );
}