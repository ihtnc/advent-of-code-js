import { cn } from '@/utilities';
import InfoIcon from '@public/images/info.svg';
import Image from 'next/image';

export default function Info({
  className,
  children,
} : Readonly<{
  className?: string,
  children: React.ReactNode,
}>) {
  return (
    <div className="flex items-center gap-4 rounded-lg p-4 bg-amber-100 dark:bg-gray-700">
      <Image
        aria-hidden
        src={InfoIcon}
        alt="Info icon"
        className="dark:invert"
        width={20}
        height={20}
      />
      <span className={cn('text-sm text-left text-gray-400', className)}>
        {children}
      </span>
    </div>
  );
};