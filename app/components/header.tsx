import Link from "next/link";

export default function Header({
  className,
}: Readonly<{
  className?: string,
}>) {
  return (
    <header className={`${["flex flex-col gap-6 flex-wrap items-center justify-center", className].join(' ')}`}>
      <Link href="/"
        className="text-2xl sm:text-3xl font-semibold uppercase"
      >
        Advent of Code
      </Link>
    </header>
  );
};