'use client';

import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="flex flex-col gap-16 place-items-center pt-24">
      <h1 className="flex text-xl sm:text-2xl gap-2">
        <Image
          aria-hidden
          src="/not-found.svg"
          alt="Error icon"
          width={32}
          height={32}
          className="dark:invert"
        />
        Error
      </h1>
      {error.message}
      <button onClick={reset}
        className="flex gap-2 group"
      >
        <Image
            aria-hidden
            src="/rotate-right.svg"
            alt="User icon"
            width={24}
            height={24}
            className="dark:invert group-hover:scale-125"
        />
        Retry
      </button>
    </section>
  );
};