import { promises as fs } from "fs";
import path from 'path';
import { NextResponse } from 'next/server';
import type { DataResponse } from '@/api/types';
import { getCodeBasePath } from "@/api/code";
import type { Solution, Problem } from './types';

export async function GET() {
  const solutions: Array<Solution> = [];

  const basePath = getCodeBasePath();
  const years = await fs.readdir(basePath);

  for(const year of years) {
    const solution: Solution = {
      year: Number(year),
      problems: [],
    };

    const file = path.join(basePath, year);
    const days = await fs.readdir(file);

    for(const day of days) {
      const parts = await fs.readdir(path.join(file, day));
      const problem: Problem = {
        day: Number(day),
        stars: parts.length,
      };

      solution.problems.push(problem);
    }

    solutions.push(solution);
  }

  const responseBody: DataResponse<Array<Solution>> = {
    success: true,
    data: solutions,
  };

  return NextResponse.json(responseBody);
};