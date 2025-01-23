import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from "fs";
import path from 'path';
import { DataResponse } from '@/api/types';
import { getCodeBasePath } from "@/api/code";

function getCodeFullPath(year: string, day: string, part: string): string {
  const basePath = getCodeBasePath();
  const fullPath = path.join(process.cwd(), basePath, year, day, `solution-part${part}.txt`);
  return fullPath;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get('year');
  const day = searchParams.get('day');
  const part = searchParams.get('part');

  const responseBody: DataResponse<string> = {
    success: false,
    data: '',
  };

  if(!year || !day || !part) { return NextResponse.json(responseBody); }

  const codePath = getCodeFullPath(year, day, part);
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
  responseBody.success = true;
  responseBody.data = cleaned;

  return NextResponse.json(responseBody);
};