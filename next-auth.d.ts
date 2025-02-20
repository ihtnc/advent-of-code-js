import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    adventOfCodeSession: string;
  }

  interface User {
    adventOfCodeSession: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    adventOfCodeSession: string;
  }
}