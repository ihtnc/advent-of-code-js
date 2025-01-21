import Image from "next/image";
import Link from "next/link";
import { getAdventOfCodeUrl } from "@/actions/advent-of-code";
import GitHubIcon from "@public/images/github.svg";
import SiteIcon from "@public/images/site-alt.svg";

export default function Footer({
  className,
}: Readonly<{
  className?: string,
}>) {
  const url = getAdventOfCodeUrl();

  return (
    <footer className={`${["flex gap-6 flex-wrap items-center justify-center pt-12", className].join(' ')}`}>
      <Link
        className="flex items-center gap-2 group"
        href="https://github.com/ihtnc/advent-of-code-js"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src={GitHubIcon}
          alt="Github logo"
          width={16}
          height={16}
          className="dark:hue-rotate-60 group-hover:scale-125"
        />
        Repository
      </Link>

      <Link
        className="flex items-center gap-2 group"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src={SiteIcon}
          alt="Link icon"
          width={16}
          height={16}
          className="dark:hue-rotate-60 group-hover:scale-125"
        />
        Advent of Code
      </Link>
    </footer>
  );
};