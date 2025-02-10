import { BlockType, type Block, type FileBlock, type InputData } from './types';
import { calculateChecksum, getDiskAllocation } from './solution-part1';

type Fn = ({ blocks }: InputData) => Promise<number>;

const solution: Fn = async ({ blocks }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const compacted = compactDisk(blocks);

      // check part 1 for getDiskAllocation definition
      const allocation = getDiskAllocation(compacted);

      // check part 1 for calculateChecksum definition
      const checksum = calculateChecksum(allocation);

      resolve(checksum);
    });
  });

  return promise;
};

type CompactFn = (blocks: Array<Block>) => Array<Block>;

const compactDisk: CompactFn = (blocks) => {
  const allocation: Array<Block> = trimSpace([...blocks]);
  if (allocation.length === 0) { return allocation; }

  let last: FileBlock | null = null;
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].type === BlockType.File) {
      last = blocks[i] as FileBlock;
      break;
    }
  }
  if (last === null) { return allocation; }

  let fileId = last.id;
  while(fileId > 0) {
    const fileIndex = getFileBlockIndex(allocation, fileId);
    if (fileIndex === -1) { return allocation; }

    const file = allocation[fileIndex] as FileBlock;
    const freeIndex = getFreeSpace(allocation, file.space, fileIndex);
    if (freeIndex >= 0) {
      const free = allocation[freeIndex] as Block;

      const oldSpace: Block = { type: BlockType.Free, space: file.space };
      allocation.splice(fileIndex, 1, oldSpace);

      const newSpace: Array<Block> = [file];
      if (free.space > file.space) {
        free.space -= file.space;
        newSpace.push(free);
      }

      allocation.splice(freeIndex, 1, ...newSpace);
    }

    fileId--;
  }

  trimSpace(allocation);

  return allocation;
}

type GetFileFn = (blocks: Array<Block>, id: number) => number;

const getFileBlockIndex: GetFileFn = (blocks, id) => {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === BlockType.Free) { continue; }
    if ((blocks[i] as FileBlock).id === id) { return i; }
  }

  return -1;
};

type GetSpaceFn = (blocks: Array<Block>, space: number, endIndex?: number) => number;

const getFreeSpace: GetSpaceFn = (blocks, space, endIndex) => {
  let limit = blocks.length;
  if (endIndex && endIndex < blocks.length) { limit = endIndex; }

  for (let i = 0; i < limit; i++) {
    const block = blocks[i];
    if (block.type === BlockType.Free && block.space >= space) { return i; }
  }

  return -1;
};

type TrimFn = (blocks: Array<Block>) => Array<Block>;

const trimSpace: TrimFn = (blocks) => {
  const trimmed = blocks;
  if (trimmed.length === 0) { return trimmed; }

  while (trimmed.slice(-1).pop()?.type === BlockType.Free) {
    trimmed.pop();
  }

  return trimmed;
};

export { solution };