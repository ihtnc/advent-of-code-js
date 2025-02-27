import Link from "next/link";
import Image from "next/image";
import ProblemDetails from "@/components/problem-details";
import TypeDetails from "@/components/type-details";
import { getSolutions } from "@/actions/text-content";
import { getSolutionUrl } from "@/solutions/actions";
import LocationArrowIcon from "@public/images/location-arrow.svg";
import DailyCalendarIcon from "@public/images/daily-calendar.svg";

export default async function AdventDetails({
  year,
  day,
  children,
}: Readonly<{
  year: number,
  day: number,
  children: React.ReactNode,
}>) {
  const groups = await getSolutions(year);
  const group = groups.shift();

  const previousDay = day-1;
  const nextDay = day+1;
  const firstDay = group?.days[0].day || 1;
  const lastDay = group?.days[group.days.length-1].day || 25;
  const previousDayUrl = previousDay >= firstDay ? getSolutionUrl(year, previousDay) : null;
  const nextDayUrl = nextDay <= lastDay ? getSolutionUrl(year, nextDay) : null;

  return (
    <div className="flex flex-col ml-6 gap-6">
      <ProblemDetails year={year} day={day} />
      <TypeDetails year={year} day={day} />
      {children}
      <span className="flex mt-6">
        {previousDayUrl && (
          <Link
            href={previousDayUrl}
            className="flex gap-2 group"
          >
            <Image
              aria-hidden
              src={LocationArrowIcon}
              alt="Previous icon"
              className="-rotate-135 group-hover:scale-125 dark:invert"
              width={32}
              height={32}
            />
            <Image
              aria-hidden
              src={DailyCalendarIcon}
              alt="Calendar icon"
              className="dark:invert"
              width={32}
              height={32}
            />
          </Link>
        )}
        {nextDayUrl && (
          <Link
            href={nextDayUrl}
            className="flex ml-auto gap-2 group"
          >
            <Image
              aria-hidden
              src={DailyCalendarIcon}
              alt="Calendar icon"
              className="dark:invert"
              width={32}
              height={32}
            />
            <Image
              aria-hidden
              src={LocationArrowIcon}
              alt="Previous icon"
              className="rotate-45 group-hover:scale-125 dark:invert"
              width={32}
              height={32}
            />
          </Link>
        )}
      </span>
    </div>
  );
};