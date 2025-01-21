import Image from "next/image";
import NotFoundIcon from "@public/images/404.svg";

export default function NotFound() {
  return (
    <section className="flex flex-col gap-4 pt-24">
      <h1 className="flex place-items-center text-xl sm:text-2xl gap-2">
        <Image
          aria-hidden
          src={NotFoundIcon}
          alt="Not found icon"
          width={32}
          height={32}
          className="dark:hue-rotate-60"
        />
        Page not found.
      </h1>
    </section>
  );
};