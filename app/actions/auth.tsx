import { redirect } from 'next/navigation';
import { fetchJson } from "@/actions";
import type { SessionData } from "@/api/session/types";
import type { Response } from "@/api/types";

type FormState =
  | {
      message: string,
    }
  | undefined;

export async function login(state: FormState, formData: FormData): Promise<FormState | undefined> {
  const request: SessionData = { session: formData.get('session') as string };

  const response = await fetchJson<Response>('session', null, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (!response.success) {
    const errors: FormState = {
      message: response.message || 'Failed to login',
    };
    return errors;
  }

  redirect('/');
};