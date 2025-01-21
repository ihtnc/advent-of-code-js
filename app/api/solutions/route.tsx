import { NextResponse } from 'next/server';
import type { DataResponse } from '@/api/types';
import type { Solution } from './types';

export async function GET() {
  const responseBody: DataResponse<Array<Solution>> = {
    success: true,
    data: [{
      year: 2024,
      problems: [
        { day: 1, stars: 2 },
        { day: 2, stars: 1 },
      ],
    }, {
      year: 2023,
      problems: [],
    }],
 };

  return NextResponse.json(responseBody);
};