import "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    adventOfCodeSession: string;
  }
}