import { getChallengeInput } from "@/solutions/actions";
import AdventDetails from "@/components/advent-details";
import SolutionDetails from "@/components/solution-details";
import Info from "@/components/info";
import { getSession } from "@/actions/session";
import { inputParser } from "./input-parser";
import { Size } from "./types";
import Solution from "./solution";

export default async function Page() {
  const year = 2024;
  const day = 14;
  const input = await getChallengeInput(year, day, inputParser);

  const session = await getSession();
  const width = session ? 101 : 11;
  const height = session ? 103 : 7;

  const mapSize1: Size = { width, height };
  const mapSize2: Size | undefined = session ? mapSize1 : undefined;

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={<Solution part={1} input={input} mapSize={mapSize1} />} />
      <SolutionDetails year={year} day={day} part={2} answer={<Solution part={2} input={input} mapSize={mapSize2} />} />
      <Info>
        {renderInfoText1(width, height)}
        <br /><br />
        {renderInfoText2(session)}
      </Info>
    </AdventDetails>
  );
};

const renderInfoText1 = (width: number, height: number) => {
  return (<>
    Since the map size can&apos;t be determined from the input, the result may differ from expected.
    This solution calculates after
    <b><code className="text-black dark:text-white">&nbsp;100 seconds&nbsp;</code></b>
    for part 1 and assumes a
    <b><code className="text-black dark:text-white">&nbsp;{width}x{height} map</code></b>.
  </>);
};

const renderInfoText2 = (session: string) => {
  if (!session) {
    return (<>
      Also, part 2 of the solution has no applicable answer.
    </>);
  }

  return (<>
    Also, part 2 of the solution is looking for a
    <b><code className="text-black dark:text-white">&nbsp;31x33 Christmas tree&nbsp;</code></b>
    pattern.
  </>);
};