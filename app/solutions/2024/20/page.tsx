import { getChallengeInput } from "@/solutions/actions";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import Info from "@/components/info";
import { getSession } from "@/actions/session";
import { inputParser } from "./input-parser";
import { solution as solution1 } from "./solution-part1";
import { solution as solution2 } from "./solution-part2";

export default async function Page() {
  const year = 2024;
  const day = 20;
  const input = await getChallengeInput(year, day, inputParser);
  const session = await getSession();
  const threshold = session ? 100 : 50;

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={() => solution1(input, threshold)} />
      <SolutionDetails year={year} day={day} part={2} answer={() => solution2(input, threshold)} />
      <Info>
        {renderInfoText(threshold)}
      </Info>
    </AdventDetails>
  );
};

const renderInfoText = (threshold: number) => {
  return (<>
    Since the minimum value for finding time savings can&apos;t be determined from the input, the result may differ from expected.
    This solution uses at least
    <b><code className="text-black dark:text-white">&nbsp;{threshold} picoseconds</code>&nbsp;</b>
    for the minimum time savings.
    <br /><br />
    Also, part 2 of the solution assumes the new cheat rule of at most
    <b><code className="text-black dark:text-white">&nbsp;20 picoseconds</code></b>.
  </>);
};