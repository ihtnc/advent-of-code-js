import type { IInputParser } from "@/actions/advent-of-code";
import { BlockType, type Block, type FileBlock, type InputData } from "./types";

const inputParser: IInputParser<InputData> = async (input: string) => {
  const promise = new Promise<InputData>(async (resolve) => {
    setTimeout(() => {
      const blocks: Array<Block> = [];
      let id = 0;

      const regexp = new RegExp(/(?<file>\d)(?<free>\d)?/, 'g');
      let match: RegExpExecArray | null;
      while(match = regexp.exec(input)) {
        const file = match.groups?.file;
        if (!file) { continue; }

        const fileBlock: FileBlock ={
          type: BlockType.File,
          space: Number(file),
          id: id++,
        };
        blocks.push(fileBlock);

        const free = match.groups?.free;
        if (free) {
          const freeBlock: Block = {
            type: BlockType.Free,
            space: Number(free),
          };
          blocks.push(freeBlock);
        }
      }

      resolve({ blocks });
    });
  });

  return promise;
};

export { inputParser };