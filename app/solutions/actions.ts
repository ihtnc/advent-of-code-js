import { getInput as remote } from "@/actions/advent-of-code";
import { getSession } from "@/actions/session";
import { getInput as local } from "@/actions/text-content";
import { getSolutions as getList } from "@/actions/text-content";

export interface IInputParser<T> {
  (input: string): Promise<T>;
};

export async function getChallengeInput<T>(year: number, day: number, parser?: IInputParser<T>): Promise<T> {
  const input = await fetchInputText(year, day);
  return input && parser ? await parser(input) : (input as unknown as T);
}

const fetchInputText = async (year: number, day: number): Promise<string> => {
  const session = await getSession();
  let input: string;
  if (session) {
    input = await remote(session, year, day);
  } else {
    input = await local(year, day);
  }
  return input;
}

export function getSolutionUrl(year: number, day: number): string {
  return `/solutions/${year}/${day}`;
};


export function getSolutionInputUrl(year: number, day: number): string {
  return `/solutions/${year}/${day}/input`;
};

type Solution = {
  year: number,
  problems: Array<Problem>,
};

type Problem = {
  day: number,
  stars: number,
}

export async function getSolutions(): Promise<Array<Solution>> {
  return getList().then((list) =>
    list.map((group) => {
      return {
        year: group.year,
        problems: group.days.map((item) => {
          return {
            day: item.day,
            stars: item.parts.length,
          };
        }),
      };
    })
  );
}
