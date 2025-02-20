'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@auth';

type FormState =
  | {
      message: string,
    }
  | undefined;

export async function login(
  state: FormState,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials.' };
        default:
          return { message: 'Something went wrong.' };
      }
    }
    throw error;
  }
};