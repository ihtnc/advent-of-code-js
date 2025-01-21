import { redirect } from 'next/navigation';
import { fetchJson } from "@/actions";

export async function GET() {
  await fetchJson<Response>('session', null, {
    method: 'DELETE',
  });

  redirect('/login');
};