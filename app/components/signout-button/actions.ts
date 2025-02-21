'use server';

import { signOut } from "@auth";

export const performSignOut = async ({ redirectTo }: { redirectTo: string }) => {
  await signOut({ redirectTo });
};