import path from 'path';

function getApiUrl(endpoint?: string, queries: URLSearchParams | null = null): string {
  const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

  const paths = [];
  paths.push('api');
  if (endpoint) { paths.push(endpoint); }

  baseUrl.pathname = path.join(...paths);

  queries?.entries().forEach(([key, value]) => {
    baseUrl.searchParams.append(key, value);
  });

  return baseUrl.toString();
};

export async function fetchJson<T>(endpoint: string, queries: URLSearchParams | null = null, options?: RequestInit): Promise<T> {
  const apiUrl = getApiUrl(endpoint, queries);
  const response = await fetch(apiUrl, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const responseBody = await response.json() as unknown as T;
  return responseBody;
}

export async function fetchExternalText(url: string, options?: RequestInit): Promise<string> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const responseBody = await response.text();
  return responseBody;
}
