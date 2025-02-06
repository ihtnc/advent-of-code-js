import Image from "next/image";
import Link from "next/link";
import { getSolutionUrl } from "./utilities";
import StarIcon from "@public/images/star.svg";

export default function SolutionLink({
  day,
  year,
  stars,
}: Readonly<{
  day: number,
  year: number,
  stars: number,
}>) {
  const solutionLink = getSolutionUrl(year, day);

  return (
    <Link
      className="flex items-center gap-1 group hover:underline hover:underline-offset-4"
      href={solutionLink}
    >
      {`Day ${day}`}
      {Array.from({ length: stars }, (_, i) => (
        <Image
          key={i}
          aria-hidden
          src={StarIcon}
          alt="Star icon"
          width={16}
          height={16}
          className="opacity-30 group-hover:opacity-100 dark:invert"
        />
      ))}
    </Link>
  );
};