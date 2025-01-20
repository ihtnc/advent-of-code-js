import ProblemDetails from "./problem-details";

export default function AdventDetails({
  year,
  day,
  children,
}: Readonly<{
  year: number,
  day: number,
  children: React.ReactNode,
}>) {
  return (
    <div className="flex flex-col ml-6 gap-6">
      <ProblemDetails year={year} day={day} />
      {children}
    </div>
  );
};