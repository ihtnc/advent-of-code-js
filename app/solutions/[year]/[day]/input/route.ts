import { notFound } from "next/navigation";
import { getChallengeInput } from "@/solutions/actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string, day: string }> },
) {
  const { year, day } = await params;

  if (Number.isInteger(Number(year)) === false || Number.isInteger(Number(day)) === false) {
    notFound();
  }

  return getChallengeInput<string>(Number(year), Number(day))
    .then((input) => {
      const response = new Response(input);
      return response;
    })
    .catch(() => notFound());
}