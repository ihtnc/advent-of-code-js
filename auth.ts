import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getInput } from '@/actions/advent-of-code';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const session = `${credentials?.session}`;

      try {
        await getInput(`${session}`, 2024, 1);
      } catch (err) {
        const error = err as Error;
        const authError = new AuthError(`${error?.message || 'Unknown error'}`);
        authError.type = 'CredentialsSignin';
        throw authError;
      }

      if (session) {
        return { adventOfCodeSession: session };
      } else {
        return null;
      }
    },
  })],
});
