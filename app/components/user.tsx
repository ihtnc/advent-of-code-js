import Image from 'next/image';
import Link from 'next/link';

export default async function User({
  className,
}: Readonly<{
  className?: string,
}>) {
  return (
    <span  className={className}>
      <span className="flex gap-6 items-center justify-center text-sm h-6">
        <span className="flex gap-2 items-center">
          <Image
            aria-hidden
            src="/user.svg"
            alt="User icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Logged in
        </span>
        <Link
          href="/logout"
          className="flex gap-2 items-center justify-center group"
        >
          <Image
            aria-hidden
            src="/sign-out-alt.svg"
            alt="Logout icon"
            width={16}
            height={16}
            className="dark:invert group-hover:scale-125"
          />
          Sign out
        </Link>
      </span>
    </span>
  );
};