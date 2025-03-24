import { cn } from "@/utilities";

export default function Main({
    children,
    className,
  }: Readonly<{
    children: React.ReactNode,
    className?: string,
  }>) {
  return (
    <main className={cn("flex gap-8 place-content-center w-full 2xl:w-1/2 xl:w-3/5 lg:w-2/3 sm:w-3/4", className)}>
      {children}
    </main>
  );
};