import type { DataResponse } from "@/api/types";
import type { Solution } from "@/api/solutions/types";
import { fetchJson } from "./index";

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