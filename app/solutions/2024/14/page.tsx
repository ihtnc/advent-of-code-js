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
  const mapSize1: Size = session ? { width: 101, height: 103 } : { width: 11, height: 7 };
  const mapSize2: Size | undefined = session ? mapSize1 : undefined;

  return (
    <AdventDetails year={year} day={day}>
      <SolutionDetails year={year} day={day} part={1} answer={<Solution part={1} input={input} mapSize={mapSize1} />} />
      <SolutionDetails year={year} day={day} part={2} answer={<Solution part={2} input={input} mapSize={mapSize2} />} />
      <Info>
        Since the map size can&apos;t be determined from the input, the result may differ from expected.
        This solution uses a
        <b><code className="text-black dark:text-white">&nbsp;11x7 map&nbsp;</code></b>
        for the sample input, and a
        <b><code className="text-black dark:text-white">&nbsp;101x103 map&nbsp;</code></b>
        for your input.
        <br /><br />
        Also, part 2 of the solution has no applicable answer when using the sample input.
        And it is looking for a
        <b><code className="text-black dark:text-white">&nbsp;31x33 Christmas tree&nbsp;</code></b>
        pattern when using your input.
      </Info>
    </AdventDetails>
  );
};