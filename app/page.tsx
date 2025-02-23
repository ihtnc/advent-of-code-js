import Image from "next/image";
import User from "@/components/user";
import ExpandableContainer from "@/components/expandable-container";
import SolutionLink from "@/components/solution-link";
import { getSolutions } from "@/solutions/actions";
import ChallengeIcon from "@public/images/challenge.svg";

export default async function Home() {
  const solutions = await getSolutions();
  const latestYear = solutions[0]?.year;

  return (
    <section className="flex flex-col gap-6">
      <User className="pb-6" />

      <h1 className="text-center sm:text-left text-lg">
        Solutions for the Advent of Code challenges.
      </h1>

      <ul className="list-inside list-none text-lg text-center sm:text-left w-sm">
        {solutions.map(({ year, problems }) => (
          <li key={year} className="mb-2 w-full">
            <ExpandableContainer
              className="place-items-center md:place-items-start gap-2"
              labelClassName="cursor-pointer text-center text-2xl sm:text-left max-w-fit"
              label={(
                <span className="flex gap-2 group">
                  <Image
                    aria-hidden
                    src={ChallengeIcon}
                    alt="Challenge icon"
                    width={24}
                    height={24}
                    className="group-hover:scale-125 dark:invert"
                  />{year}
                </span>
              )}
              expanded={year === latestYear}
            >

              <ul className="grid grid-flow-col grid-rows-13 md:grid-rows-10 gap-y-1 gap-x-6 md:pl-8">
                {problems.map((problem) => (
                  <li key={problem.day}>
                    <SolutionLink day={problem.day} year={year} stars={problem.stars} />
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
