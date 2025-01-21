import { fetchJson } from "@/actions";
import { DataResponse } from "@/api/types";

const getNextConfig = () => {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  return {
    tags: [key],
  };
};

export async function fetchCode(year: number, day: number, part: number): Promise<string> {
  const queries = new URLSearchParams();
  queries.set('year', year.toString());
  queries.set('day', day.toString());
  queries.set('part', part.toString());

  const response = await fetchJson<DataResponse<string>>('code', queries, {
    next: getNextConfig(),
  });

  return response.data ?? '';
};