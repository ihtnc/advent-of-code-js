import Image from "next/image";
import ExpandableContainer from "@/components/expandable-container";
import TypescriptCode from "@/components/code-snippet/typescript-code";
import { getTypes } from "@/actions/text-content";
import FileCodeIcon from "@public/images/file-code.svg";
import CodeSimpleIcon from "@public/images/code-simple.svg";

export default async function TypeDetails({
  year,
  day,
} : Readonly<{
  year: number,
  day: number,
}>) {
  const types = await getTypes(year, day);

  const label = (
    <span className="flex text-2xl self-start place-items-center gap-4 group">
      <Image
        aria-hidden
        src={FileCodeIcon}
        alt="File icon"
        width={48}
        height={48}
        className="dark:invert"
      />
      <span className="flex flex-col">
        <span className="text-sm text-gray-400 uppercase">View Types</span>
          <Image
            aria-hidden
            src={CodeSimpleIcon}
            alt="Code icon"
            width={20}
            height={20}
            className="group-hover:scale-125 ml-auto mr-auto h-7 sm:h-8 dark:invert"
          />
        </span>
    </span>
  );

  return (
    <span className="gap-6 md:w-3/4 xl:w-2/3 2xl:w-3/5 md:mx-auto">
      <ExpandableContainer label={label} labelClassName="cursor-pointer" childrenClassName="place-content-center">
        <TypescriptCode code={types} className="text-sm md:ml-16 w-full" />
      </ExpandableContainer>
    </span>
  );
}