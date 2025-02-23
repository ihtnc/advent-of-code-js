import Link from "next/link";
import { cn } from "@/utilities";

export default function Header({
  className,
}: Readonly<{
  className?: string,
}>) {
  return (
    <header className={cn("flex flex-col gap-6 flex-wrap items-center justify-center", className)}>
      <Link href="/"
        className="text-3xl font-semibold uppercase"
      >
        Advent of Code
      </Link>
    </header>
  );
};