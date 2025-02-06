import Image from "next/image";
import LoadingIcon from "@public/images/loading.svg";

export default function Spinner({
  width = 100,
  height = 100,
  className,
}: Readonly<{
  width: number,
  height: number,
  className?: string,
}>) {
  return (
    <Image
      aria-hidden
      src={LoadingIcon}
      alt="Loading icon"
      className={`${["animate-spin dark:invert", className].join(' ')}`}
      width={width} height={height}
    />
  );
};