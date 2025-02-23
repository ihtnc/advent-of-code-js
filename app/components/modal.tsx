import Image from 'next/image';
import { cn } from '@/utilities';
import CrossIcon from '@public/images/cross.svg';

export default function Modal({
  children,
  title,
  show,
  onClose,
  className,
}: Readonly<{
  children: React.ReactNode,
  title: string,
  show: boolean,
  onClose: () => void,
  className?: string,
}>) {
  if (!show) { return null; }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 gap-6">
        <span className="flex justify-between">
          <h2 className="flex text-2xl">{title}</h2>
          <button
            className="flex cursor-pointer"
            onClick={() => onClose()}>
            <Image
              aria-hidden
              src={CrossIcon}
              alt="Close icon"
              width={16}
              height={16}
              className="hover:scale-125 dark:invert"
            />
          </button>
        </span>
        <span className={cn('flex flex-col', className)}>
          {children}
        </span>
      </div>
    </div>
  );
};

