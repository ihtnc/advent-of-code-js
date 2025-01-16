import { NextResponse } from 'next/server';
import type { DataResponse } from '@/api/types';
import type { Solution } from './types';

export async function GET() {
  const responseBody: DataResponse<Array<Solution>> = {
    success: true,
    data: [{
      year: 2024,
      days: [1, 2],
    }, {
      year: 2023,
      days: [1, 2, 3],
    }],
 };

  return NextResponse.json(responseBody);
};