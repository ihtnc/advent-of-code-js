export default function Main({
    children,
    className,
  }: Readonly<{
    children: React.ReactNode,
    className?: string,
  }>) {
  return (
    <main className={`${["flex gap-8 place-content-center w-full xl:w-1/3 lg:w-1/2 sm:w-3/4", className].join(' ')}`}>
      {children}
    </main>
  );
};