import Image from "next/image";
import User from "./components/user";
import ExpandableContainer from "@/components/expandable-container";
import SolutionLink from "@/components/solution-link";
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
        {solutions.map(({ year, problems }) => (
          <li key={year} className="mb-2 w-fit">
            <ExpandableContainer
              labelClassName="cursor-pointer text-xl text-center sm:text-2xl sm:text-left max-w-fit"
              label={(
                <span className="flex gap-2 group">
                  <Image
                    aria-hidden
                    src="/challenge.svg"
                    alt="Challenge icon"
                    width={24}
                    height={24}
                    className="dark:hue-rotate-60 group-hover:scale-125"
                  />{year}
                </span>
              )}
              expanded={year === latestYear}
            >

              <ul className="place-items-center sm:place-items-start">
                {problems.map((problem) => (
                  <li key={problem.day} className="pl-8">
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
