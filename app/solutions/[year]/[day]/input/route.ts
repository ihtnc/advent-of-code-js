import { getChallengeInput } from "@/solutions/actions";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: number, day: number }> },
) {
  const { year, day } = await params;
  const input = await getChallengeInput<string>(year, day);
  const response = new Response(input);
  return response;
}