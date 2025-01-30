import { getInput } from "@/actions/advent-of-code";
import { getSession } from "@/actions/session";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import Solution from "./solution";
import { inputParser } from "./input-parser";

export default async function Page() {
  const year = 2024;
  const day = 6;
  const session = await getSession();
  const input = await getInput(session, year, day, inputParser);

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={<Solution part={1} data={input} />} />
      <SolutionDetails year={year} day={day} part={2} answer={<Solution part={2} data={input} />} />
    </AdventDetails>
  );
};