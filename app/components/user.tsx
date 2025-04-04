import Image from 'next/image';
import { getSession } from '@/actions/session';
import SignInButton from '@/components/signin-button';
import SignOutButton from '@/components/signout-button';
import UserIcon from '@public/images/user.svg';
import UserLockIcon from '@public/images/user-lock.svg';

export default async function User({
  className,
}: Readonly<{
  className?: string,
}>) {
  const session = await getSession();
  const trimmed = session.length > 15 ? `Session: ${session.substring(0, 6)}...${session.substring(session.length - 6)}` : session;

  const icon = session ? UserIcon : UserLockIcon;
  const title = session ? 'Using your input' : 'Using sample input';
  const button = session ? <SignOutButton /> : <SignInButton />;

  return (
    <span className={className}>
      <span className="flex gap-6 place-self-center justify-between text-sm h-6 w-64">
        <span className="flex gap-2 items-center" title={trimmed}>
          <Image
            aria-hidden
            src={icon}
            alt="User icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          {title}
        </span>
        <span className='flex'>
          {button}
        </span>
      </span>
    </span>
  );
};