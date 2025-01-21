import Image from "next/image";
import Link from "next/link";
import { getAdventOfCodeUrl, getAdventOfCodeInputUrl } from "@/actions/advent-of-code";

export default function ProblemDetails({
  year,
  day,
}: Readonly<{
  year: number,
  day: number,
}>) {
  const yearUrl = getAdventOfCodeUrl(year);
  const dayUrl = getAdventOfCodeUrl(year, day);
  const inputUrl = getAdventOfCodeInputUrl(year, day);

  return (
    <>
      <h1 className="flex self-start place-items-center text-xl sm:text-2xl gap-4">
        <Image
          aria-hidden
          src="/challenge.svg"
          alt="Challenge icon"
          width={48}
          height={48}
          className="dark:hue-rotate-60"
        />
        <span className="flex flex-col">
          <span className="text-sm text-gray-400 uppercase">Challenge</span>
          <Link
            className="hover:underline hover:underline-offset-4"
            href={yearUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {year}
          </Link>
        </span>
        &gt;
        <span className="flex flex-col">
          <span className="text-sm text-gray-400 uppercase">Problem</span>
          <Link
            className="hover:underline hover:underline-offset-4"
            href={dayUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Day {day}
          </Link>
        </span>
        &gt;
        <span className="flex flex-col">
          <span className="text-sm text-gray-400 uppercase">Input</span>
          <Link
            className="flex group h-7 sm:h-8 place-items-center"
            href={inputUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/document.svg"
              alt="Document icon"
              width={20}
              height={20}
              className="dark:hue-rotate-60 group-hover:scale-125 ml-auto mr-auto"
            />
          </Link>
        </span>
      </h1>
    </>
  );
}