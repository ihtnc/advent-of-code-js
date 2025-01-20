import Image from "next/image";
import Link from "next/link";
import User from "@/components/user";

export default function YearTemplate({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <section className="flex flex-col gap-6 w-full text-center content-center mb-12">
      <User className="pb-6" />

      <Link
        className="flex self-start gap-2 text-md text-left sm:text-lg group"
        href="/"
      >
        <Image
          aria-hidden
          src="/location-arrow.svg"
          alt="Back icon"
          className="-rotate-[135deg] dark:invert group-hover:scale-125"
          width={16}
          height={16}
        />
        Back
      </Link>
      {children}
    </section>
  );
};