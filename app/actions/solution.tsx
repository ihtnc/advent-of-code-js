import type { DataResponse } from "@/api/types";
import type { Solution } from "@/api/solutions/types";
import { fetchJson, getApiBaseUrl } from "./index";

export async function getSolutions(): Promise<Array<Solution>> {
  const baseUrl = getApiBaseUrl();
  return fetchJson<DataResponse<Array<Solution>>>(`${baseUrl}/solutions`)
    .then((response) => {
      return response.data || [];
    })
    .catch(() => {
      return [];
    });
}