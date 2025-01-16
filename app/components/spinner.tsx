import Image from "next/image";

export default function Spinner({
  width = 100,
  height = 100,
}: Readonly<{
  width: number,
  height: number,
}>) {
  return (
    <Image
      aria-hidden
      src="/loading.svg"
      alt="Loading icon"
      className="animate-spin dark:invert"
      width={width} height={height}
    />
  );
};