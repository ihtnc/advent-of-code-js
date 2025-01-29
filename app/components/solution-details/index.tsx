import { Suspense } from "react";
import Image from "next/image";
import ExpandableContainer from "@/components/expandable-container";
import TypescriptCode from "@/components/code-snippet/typescript-code";
import Spinner from "@/components/spinner";
import { getCode } from "./utilities";
import StarIcon from "@public/images/star.svg";
import CodeSimple from "@public/images/code-simple.svg";

export default async function SolutionDetails({
  year,
  day,
  part,
  answer,
} : Readonly<{
  year: number,
  day: number,
  part: number,
  answer: number | (() => Promise<number>),
}>) {
  const code = await getCode(year, day, part);

  const renderAnswer = () => {
    if (typeof answer === "function") {
      return answer();
    }

    return Promise.resolve(answer);
  };

  const label = (
    <span className="flex text-xl sm:text-2xl self-start place-items-center gap-4 group">
      <Image
        aria-hidden
        src={StarIcon}
        alt="Star icon"
        width={48}
        height={48}
        className="dark:hue-rotate-60"
      />
      <span className="flex flex-col">
        <span className="text-sm text-gray-400 uppercase">Part {part} Answer</span>
        <Suspense fallback={<Spinner width={32} height={32} className="self-center" />}>
          {renderAnswer()}
        </Suspense>
      </span>
      <span className="flex flex-col">
        <span className="text-sm text-gray-400 uppercase">View Code</span>
          <Image
            aria-hidden
            src={CodeSimple}
            alt="Code icon"
            width={20}
            height={20}
            className="dark:hue-rotate-60 group-hover:scale-125 ml-auto mr-auto h-7 sm:h-8"
          />
        </span>
    </span>
  );

  return (
    <span className="gap-6">
      <ExpandableContainer label={label} labelClassName="cursor-pointer" childrenClassName="place-content-center">
        <TypescriptCode code={code} className="text-sm" />
      </ExpandableContainer>
    </span>
  );
}