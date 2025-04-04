import Image from "next/image";
import Link from "next/link";
import User from "@/components/user";
import LocationArrowIcon from "@public/images/location-arrow.svg";

export default function YearTemplate({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <section className="flex flex-col gap-6 w-full text-center content-center">
      <User className="pb-6" />

      <Link
        className="flex self-start gap-2 text-left text-lg group"
        href="/"
      >
        <Image
          aria-hidden
          src={LocationArrowIcon}
          alt="Back icon"
          className="-rotate-135 group-hover:scale-125  dark:invert"
          width={16}
          height={16}
        />
        Back
      </Link>
      {children}
    </section>
  );
};