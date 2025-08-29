import { getChallengeInput } from "@/solutions/actions";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import Info from "@/components/info";
import { inputParser } from "./input-parser";
import { solution as solution1 } from "./solution-part1";
import { solution as solution2 } from "./solution-part2";

export default async function Page() {
  const year = 2024;
  const day = 21;
  const input = await getChallengeInput(year, day, inputParser);

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={() => solution1(input)} />
      <SolutionDetails year={year} day={day} part={2} answer={() => solution2(input)} />
      <Info>
        {renderInfoText()}
      </Info>
    </AdventDetails>
  );
};

const renderInfoText = () => {
  return (<>
    Since the number of robots using directional keypads can&apos;t be determined from the input, the result may differ from expected.
    This solution assumes that there are
    <b><code className="text-black dark:text-white">&nbsp;25 robots&nbsp;</code></b>
    using the directional keypad for part 2.
  </>);
};
