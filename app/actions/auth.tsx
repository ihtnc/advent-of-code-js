import { redirect } from 'next/navigation';
import { getApiBaseUrl, fetchJson } from "@/actions";
import type { SessionData } from "@/api/session/types";
import type { Response } from "@/api/types";
import { FormState } from "./types";

export async function login(state: FormState, formData: FormData): Promise<FormState | undefined> {
  const baseUrl = getApiBaseUrl();
  const request: SessionData = { session: formData.get('session') as string };

  const response = await fetchJson<Response>(`${baseUrl}/session`, {
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