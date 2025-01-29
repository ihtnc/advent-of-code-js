import { getInput } from "@/actions/advent-of-code";
import { getSession } from "@/actions/session";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import { solution as solution1 } from "./solution-part1";
import { solution as solution2 } from "./solution-part2";

export default async function Page() {
  const year = 2024;
  const day = 3;
  const session = await getSession();
  const input = await getInput<string>(session, year, day);

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={() => solution1(input)} />
      <SolutionDetails year={year} day={day} part={2} answer={() => solution2(input)} />
    </AdventDetails>
  );
};