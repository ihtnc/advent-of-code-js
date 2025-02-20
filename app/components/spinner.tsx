import Image from "next/image";
import { cn } from "@/utilities";
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
      className={cn("animate-spin dark:invert", className)}
      width={width} height={height}
    />
  );
};