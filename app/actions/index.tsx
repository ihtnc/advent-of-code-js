function trimEndSlashes(url?: string): string {
  return url?.replace(/\/+$/, '') || '';
};

export function getApiBaseUrl(): string {
  const baseUrl = trimEndSlashes(process.env.NEXT_PUBLIC_BASE_URL ?? '');
  return `${baseUrl}/api`;
};

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const responseBody = await response.json() as unknown as T;
  return responseBody;
}

export async function fetchText(url: string, options?: RequestInit): Promise<string> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const responseBody = await response.text();
  return responseBody;
}