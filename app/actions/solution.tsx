import type { DataResponse } from "@/api/types";
import type { Solution } from "@/api/solutions/types";
import { fetchJson } from "./index";

export function getSolutionUrl(year: number, day: number): string {
  return `/solutions/${year}/${day}`;
};

const getNextConfig = () => {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  return {
    tags: [key],
  };
};

export async function getSolutions(): Promise<Array<Solution>> {
  return fetchJson<DataResponse<Array<Solution>>>('solutions', null, {
    next: getNextConfig(),
  })
  .then((response) => {
    return response.data || [];
  })
  .catch(() => {
    return [];
  });
}
