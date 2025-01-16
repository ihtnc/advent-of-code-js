import AdventDetails from "./advent-details";

export default function ChallengeDetails({
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
      <AdventDetails year={year} day={day} />
      {children}
    </div>
  );
};