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

  const task1 = new Promise<number>(async (resolve) => {
    const input = await getInput<string>(session, year, day);
    const result = await solution1(input);
    resolve(result);
  });

  const task2 = new Promise<number>(async (resolve) => {
    const input = await getInput<string>(session, year, day);
    const result = await solution2(input);
    resolve(result);
  });

  const [part1, part2] = await Promise.all([task1, task2]);

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={part1} />
      <SolutionDetails year={year} day={day} part={2} answer={part2} />
    </AdventDetails>
  );
};