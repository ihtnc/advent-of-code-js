import { getCodeList } from "@/components/solution-details/utilities";

type Solution = {
  year: number,
  problems: Array<Problem>,
};

type Problem = {
  day: number,
  stars: number,
}

export async function getSolutions(): Promise<Array<Solution>> {
  return getCodeList().then((list) =>
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
