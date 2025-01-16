import { redirect } from 'next/navigation';
import { getApiBaseUrl, fetchJson } from "@/actions";

export async function GET() {
  const baseUrl = getApiBaseUrl();
  await fetchJson<Response>(`${baseUrl}/session`, {
    method: 'DELETE',
  });

  redirect('/login');
};