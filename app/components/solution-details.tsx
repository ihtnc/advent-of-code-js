import Image from "next/image";
import { promises as fs } from "fs";
import ExpandableContainer from "./expandable-container";
import TypescriptCode from "./code-snippet/typescript-code";

export default async function SolutionDetails({
  part,
  answer,
  codePath,
} : Readonly<{
  part: number,
  answer: number,
  codePath: string,
}>) {
  const contents = await fs.readFile(`${process.cwd()}/${codePath}`, 'utf8');

  // remove import/export code
  const code = contents.replace(/^\s*(?:import|export)\s+(?:[^;]+);\s*/gm, '');

  const label = (
    <span className="flex text-xl sm:text-2xl self-start place-items-center gap-4">
      <Image
        aria-hidden
        src="/puzzle-piece.svg"
        alt="Puzzle icon"
        width={48}
        height={48}
        className="dark:hue-rotate-60"
      />
      <span className="flex flex-col">
        <span className="text-sm text-gray-400 uppercase">Part {part} Answer</span>
        {answer}
      </span>
      <span className="flex flex-col group">
        <span className="text-sm text-gray-400 uppercase">View Code</span>
          <Image
            aria-hidden
            src="/code-simple.svg"
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