import Image from "next/image";
import Link from "next/link";

export default function ChallengeLink({
  day,
  year,
}: Readonly<{
  day: number,
  year: number,
}>) {
  return (
    <Link
      className="flex items-center gap-0 sm:gap-2 group hover:underline hover:underline-offset-4"
      href={`/${year}/${day}`}
    >
      <Image
        aria-hidden
        src="/daily-calendar.svg"
        alt="Calendar icon"
        className="collapse group-hover:visible sm:w-4 w-0 dark:invert"
        width={16}
        height={16}
      />
      {`Day ${day}`}
    </Link>
  );
};