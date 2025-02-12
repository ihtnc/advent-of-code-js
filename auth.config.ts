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
        token.session = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.adventOfCodeSession = `${token.session}`;
      return session;
    }
  },
  providers: [],
} satisfies NextAuthConfig;