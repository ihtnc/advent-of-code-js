import User from "./components/user";
import ExpandableContainer from "@/components/expandable-container";
import ChallengeLink from "@/components/challenge-link";
import { getSolutions } from "@/actions/solution";

export default async function Home() {
  const solutions = await getSolutions();
  const latestYear = solutions[0]?.year;

  return (
    <section className="flex flex-col gap-6">
      <User className="pb-6" />

      <h1 className="text-md text-center sm:text-left sm:text-lg">
        Solutions for the Advent of Code challenges.
      </h1>

      <ul className="text-md list-inside list-none sm:text-lg text-center sm:text-left">
        {solutions.map(({ year, days }) => (
          <li key={year} className="mb-2">
            <ExpandableContainer
              className="cursor-pointer text-xl hover:underline hover:underline-offset-4 text-center sm:text-2xl sm:text-left max-w-fit"
              text={`${year}`}
              expanded={year === latestYear}
            >

              <ul className="place-items-center sm:place-items-start">
                {days.map((day) => (
                  <li key={day}>
                    <ChallengeLink day={day} year={year} />
                  </li>
                ))}
              </ul>

            </ExpandableContainer>
          </li>
        ))}
      </ul>
    </section>
  );
};
