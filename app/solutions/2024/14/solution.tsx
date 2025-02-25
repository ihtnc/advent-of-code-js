'use client';

import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';
import type { InputData, Size } from "./types";
import { solution as solutionPart1 } from './solution-part1';
import { solution as solutionPart2 } from './solution-part2';

export default function Solution({
  part,
  input,
  mapSize,
} : Readonly<{
  part: number,
  input: InputData,
  mapSize?: Size,
}>) {
  const [ answer, setAnswer ] = useState<number>();

  useEffect(() => {
    if (!mapSize) {
      setAnswer(0);
      return;
    }

    const fn = part === 1 ? solutionPart1 : solutionPart2;
    fn(input, mapSize)
      .then(setAnswer)
      .catch(() => setAnswer(0));
  }, [part, input, mapSize]);

  if (answer !== undefined) { return <>{answer}</>; }

  return <Spinner width={32} height={32} className="self-center" />;
};