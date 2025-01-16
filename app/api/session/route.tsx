import { NextRequest, NextResponse } from "next/server";
import type { SessionData } from "./types";
import type { Response, DataResponse } from "@/api/types";

export async function POST(request: NextRequest) {
  const body = await request.json() as unknown as SessionData;

  const responseBody: Response = { success: true };
  if (!body.session) {
    responseBody.success = false;
    responseBody.message = 'Invalid session';
  }

  const response = NextResponse.json(responseBody, { status: responseBody.success ? 200 : 401 });
  if (responseBody.success) { response.cookies.set('session', body.session); }

  return response;
};

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  const responseBody: DataResponse<SessionData> = {
    success: true,
    data: { session: session || '' },
  };

  return NextResponse.json(responseBody, { status: 200 });
}

export async function DELETE() {
  const responseBody: Response = { success: true };
  const response = NextResponse.json(responseBody, { status: 200 });
  if (responseBody.success) { response.cookies.delete('session'); }

  return response;
}