import Spinner from "@/components/spinner";

export default async function Loading() {
  return (
    <section className="flex flex-col gap-16 place-items-center pt-24">
      <Spinner width={100} height={100} />
    </section>
  );
};