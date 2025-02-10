import Link from "next/link";
import Image from "next/image";
import { getSolutionUrl } from "@/components/solution-link/utilities";
import ProblemDetails from "@/components/problem-details";
import TypeDetails from "@/components/solution-details/type-details";
import LocationArrowIcon from "@public/images/location-arrow.svg";
import DailyCalendarIcon from "@public/images/daily-calendar.svg";

export default function AdventDetails({
  year,
  day,
  children,
}: Readonly<{
  year: number,
  day: number,
  children: React.ReactNode,
}>) {
  const previousDay = day-1;
  const nextDay = day+1;
  const previousDayUrl = previousDay >= 1 ? getSolutionUrl(year, previousDay) : null;
  const nextDayUrl = nextDay <= 25 ? getSolutionUrl(year, nextDay) : null;

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
              className="-rotate-[135deg] group-hover:scale-125 dark:invert"
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
              className="rotate-[45deg] group-hover:scale-125 dark:invert"
              width={32}
              height={32}
            />
          </Link>
        )}
      </span>
    </div>
  );
};