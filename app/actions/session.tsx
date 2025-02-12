import { auth } from '@auth';

export async function getSession(): Promise<string> {
  const session = await auth();
  return session?.adventOfCodeSession || '';
}