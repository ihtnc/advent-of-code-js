import { getChallengeInput } from "@/solutions/actions";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import Info from "@/components/info";
import { getSession } from "@/actions/session";
import { inputParser } from "./input-parser";
import { solution as solution1 } from "./solution-part1";
import { solution as solution2 } from "./solution-part2";
import type { Coordinates, Options } from "./types";
import { createMap } from "./utilities";

export default async function Page() {
  const year = 2024;
  const day = 18;
  const input = await getChallengeInput(year, day, inputParser);

  const session = await getSession();
  const width = session ? 71 : 7;
  const height = session ? 71 : 7;
  const batchSize = session ? 1024 : 12;
  const start: Coordinates = { x: 0, y: 0 };
  const end: Coordinates = { x: width - 1, y: height - 1 };

  // creates a map with start symbol at the upper left corner
  //   and end symbol at the lower right corner
  const map = createMap(width, height, start, end);
  const options: Options = {
    map, start, end,
    batchSize
  };

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={() => solution1(input, options)} />
      <SolutionDetails year={year} day={day} part={2} answer={() => solution2(input, options)} />
      <Info>
        {renderInfoText(width, height, batchSize)}
      </Info>
    </AdventDetails>
  );
};

const renderInfoText = (width: number, height: number, batchSize: number) => {
  return (<>
    Since the map size can&apos;t be determined from the input, the result may differ from expected.
    This solution uses a
    <b><code className="text-black dark:text-white">&nbsp;{width}x{height} map</code></b>.
    <br /><br />
    Also, part 1 of the solution processes the
    <b><code className="text-black dark:text-white">&nbsp;first {batchSize} values&nbsp;</code></b>
    of the input.
  </>);
};