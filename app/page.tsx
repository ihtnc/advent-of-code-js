import Image from "next/image";
import User from "@/components/user";
import ExpandableContainer from "@/components/expandable-container";
import SolutionLink from "@/components/solution-link";
import { getSolutions } from "@/actions/solution";
import ChallengeIcon from "@public/images/challenge.svg";

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
        {solutions.map(({ year, problems }) => (
          <li key={year} className="mb-2 w-full">
            <ExpandableContainer
              className="place-items-center md:place-items-start gap-2"
              labelClassName="cursor-pointer text-xl text-center sm:text-2xl sm:text-left max-w-fit"
              label={(
                <span className="flex gap-2 group">
                  <Image
                    aria-hidden
                    src={ChallengeIcon}
                    alt="Challenge icon"
                    width={24}
                    height={24}
                    className="group-hover:scale-125"
                  />{year}
                </span>
              )}
              expanded={year === latestYear}
            >

              <ul className="place-items-center grid-flow-row md:place-items-start md:grid md:grid-flow-col md:grid-rows-10 gap-y-1 gap-x-8 pl-8">
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
