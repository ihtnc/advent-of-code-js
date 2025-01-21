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
      className="animate-spin dark:hue-rotate-60"
      width={width} height={height}
    />
  );
};