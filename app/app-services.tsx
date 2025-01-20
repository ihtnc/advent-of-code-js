import { cookies } from "next/headers";

export async function getCurrentSession(): Promise<string> {
  const store = await cookies();
  const session = store.get('session');
  return session?.value || '';
}