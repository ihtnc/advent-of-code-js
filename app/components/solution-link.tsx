import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link
      className="flex items-center gap-2 group hover:underline hover:underline-offset-4"
      href={`/solutions/${year}/${day}`}
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
          className="dark:hue-rotate-60"
        />
      ))}
    </Link>
  );
};