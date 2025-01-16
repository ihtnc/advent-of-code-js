import Main from "@/components/main";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <Main className="mb-auto">{children}</Main>
  );
}
