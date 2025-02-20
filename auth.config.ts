import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) { return true; }
      else { return false; }
    },
    jwt({ token, user }) {
      if (user) {
        token.adventOfCodeSession = user.adventOfCodeSession;
      }
      return token;
    },
    session({ session, token }) {
      session.adventOfCodeSession = token.adventOfCodeSession;
      return session;
    }
  },
  providers: [],
} satisfies NextAuthConfig;