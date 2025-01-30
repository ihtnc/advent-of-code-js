'use client';

import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';
import { InputData } from "./input-parser";
import { solution as solutionPart1 } from './solution-part1';
import { solution as solutionPart2 } from './solution-part2';

export default function Solution({
  part,
  data,
} : Readonly<{
  part: number,
  data: InputData,
}>) {
  const [ answer, setAnswer ] = useState<number>();

  useEffect(() => {
    const fn = part === 1 ? solutionPart1 : solutionPart2;
    fn(data).then((result) => setAnswer(result));
  }, [part, data]);

  if (answer) { return <>{answer}</>; }

  return <Spinner width={32} height={32} className="self-center" />;
};