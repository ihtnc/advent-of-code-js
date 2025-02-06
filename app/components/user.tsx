import Image from 'next/image';
import Link from 'next/link';
import { getSession } from '@/actions/session';
import UserIcon from '@public/images/user.svg';
import SignOutAltIcon from '@public/images/sign-out-alt.svg';

export default async function User({
  className,
}: Readonly<{
  className?: string,
}>) {
  const session = await getSession();
  const trimmed = session.length > 15 ? `${session.substring(0, 6)}...${session.substring(session.length - 6)}` : session;

  return (
    <span  className={className}>
      <span className="flex gap-6 items-center justify-center text-sm h-6">
        <span className="flex gap-2 items-center" title={trimmed}>
          <Image
            aria-hidden
            src={UserIcon}
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
            src={SignOutAltIcon}
            alt="Logout icon"
            width={16}
            height={16}
            className="group-hover:scale-125 dark:invert"
          />
          Sign out
        </Link>
      </span>
    </span>
  );
};