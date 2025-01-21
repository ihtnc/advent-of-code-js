import { getInput } from "@/actions/advent-of-code";
import { getSession } from "@/actions/session";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import { inputParser } from "./input-parser";
import { solution as solution1 } from "./part1";
import { solution as solution2 } from "./part2";

export default async function Page() {
  const year = 2024;
  const day = 1;
  const session = await getSession();
  const input = await getInput(session, year, day, false, inputParser);
  const task1 = solution1(input);
  const task2 = solution2(input);
  const [part1, part2] = await Promise.all([task1, task2]);

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails part={1} answer={part1} codePath={`app/(year)/${year}/${day}/part1.tsx`} />
      <SolutionDetails part={2} answer={part2} codePath={`app/(year)/${year}/${day}/part2.tsx`} />
    </AdventDetails>
  );
};