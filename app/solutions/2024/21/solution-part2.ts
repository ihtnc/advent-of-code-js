import type { InputData, Number, Direction, ButtonFace } from './types';
import { createDirectionalKeyPad, createNumericKeyPad, getInstruction, createPathMap, findAndCachePath } from './solution-part1';

type Fn = ({ codes }: InputData) => Promise<number>;

const solution: Fn = async ({ codes }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const robotCount = 25;

      // check part 1 for createPathMap, createNumericKeyPad
      //   and createDirectionalKeyPad definitions
      const pathMap = createPathMap();
      const numPad = createNumericKeyPad();
      const dirPad = createDirectionalKeyPad();

      let totalComplexity = 0;
      for (const numCode of codes) {
        // check part 1 for getInstruction definition
        const r1Instructions = getInstruction(pathMap, numPad, numCode);
        if (r1Instructions === null || r1Instructions.length === 0) { continue; }

        let counter = createSegmentCounter(r1Instructions);
        for (let i = 0; i < robotCount; i++) {
          const nextCounter = new Map<string, number>();
          for (const [segment, count] of counter) {
            findAndCacheInstructions(pathMap, dirPad, segment);

            const nextSegments = getNextInstructions(pathMap, segment);
            if (nextSegments === null) { continue; }

            for (const nextSegment of nextSegments) {
              if (!nextCounter.has(nextSegment)) { nextCounter.set(nextSegment, 0) };
              nextCounter.set(nextSegment, nextCounter.get(nextSegment)! + count);
            }
          }

          counter = nextCounter;
        }

        let totalLength = 0;
        for (const [segment, count] of counter) {
          totalLength += segment.length * count;
        }

        const complexity = parseInt(numCode) * totalLength;
        totalComplexity += complexity;
      }

      return resolve(totalComplexity);
    });
  });

  return promise;
};

type CreateFn = (code: string) => Map<string, number>;

const createSegmentCounter: CreateFn = (code) => {
  // split the code into segments, retaining the 'A' character
  const segments = code.split(/(.*?A)/).filter((s) => s.length > 0);

  const counter = new Map<string, number>();
  for (const segment of segments) {
    if (!counter.has(segment)) { counter.set(segment, 0); }
    counter.set(segment, counter.get(segment)! + 1);
  }

  return counter;
};

type CacheFn = <T extends Number | Direction>(pathMap: Map<Number | Direction, Map<Number | Direction, string>>, keyPad: Map<T, ButtonFace<T>>, code: string) => void;

const findAndCacheInstructions: CacheFn = (pathMap, keyPad, code) => {
  // split the code into segments, retaining the 'A' character
  const segments = code.split(/(.*?A)/).filter((s) => s.length > 0);
  for (const segment of segments) {
    // check part 1 for findAndCachePath definition
    findAndCachePath(pathMap, keyPad, segment);
  }
};

type GetNextFn = (pathMap: Map<Number | Direction, Map<Number | Direction, string>>, code: string) => Array<string> | null;

const getNextInstructions: GetNextFn = (pathMap, code) => {
  const keys = code.split('').map((char) => char as Number | Direction);

  const instructions: Array<string> = [];
  let start: Number | Direction = 'A';
  for (const key of keys) {
    if (!pathMap.has(start) || !pathMap.get(start)!.has(key)) {
      return null;
    }

    const path = pathMap.get(start)!.get(key)!;
    instructions.push(`${path}A`);
    start = key;
  }

  return instructions;
};

export { solution };