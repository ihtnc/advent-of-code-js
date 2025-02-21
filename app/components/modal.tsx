import Image from 'next/image';
import CircleXMarkIcon from '@public/images/circle-xmark.svg';

export default function Modal({
  children,
  title,
  show,
  onClose,
}: Readonly<{
  children: React.ReactNode,
  title: string,
  show: boolean,
  onClose: () => void,
}>) {
  if (!show) { return null; }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 gap-4">
        <span className="flex justify-between">
          <h2 className="flex text-xl sm:text-2xl ">{title}</h2>
          <button
            className="flex"
            onClick={() => onClose()}>
            <Image
              aria-hidden
              src={CircleXMarkIcon}
              alt="Close icon"
              width={24}
              height={24}
              className="hover:scale-125 dark:invert"
            />
          </button>
        </span>
        {children}
      </div>
    </div>
  );
};

