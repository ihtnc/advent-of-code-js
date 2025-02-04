import { BlockType, type Block, type FileBlock, type InputData } from './input-parser';

type Fn = ({ blocks }: InputData) => Promise<number>;

const solution: Fn = async ({ blocks }) => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      const allocation = getDiskAllocation(blocks);
      const compacted = compactDisk(allocation);
      const checksum = calculateChecksum(compacted);
      resolve(checksum);
    });
  });

  return promise;
};

type BlockUnit = {
  id?: number,
};

type GetAllocationFn = (blocks: Array<Block>) => Array<BlockUnit>;

const getDiskAllocation: GetAllocationFn = (blocks) => {
  const allocation: Array<BlockUnit> = [];

  for (const block of blocks) {
    const unit: BlockUnit = {};
    if (block.type === BlockType.File) {
      const file = block as FileBlock;
      unit.id = file.id;
    }

    allocation.push(...Array(block.space).fill(unit));
  }

  return allocation;
};

type CompactFn = (blocks: Array<BlockUnit>) => Array<BlockUnit>;

const compactDisk: CompactFn = (blocks) => {
  const allocation: Array<BlockUnit> = trimSpace([...blocks]);
  if (allocation.length === 0) { return allocation; }

  let freeIndex = getFreeSpace(allocation);
  while(freeIndex !== -1) {
    const file = allocation.pop();
    allocation.splice(freeIndex, 1, file!);
    trimSpace(allocation);
    freeIndex = getFreeSpace(allocation, freeIndex + 1);
  }

  return allocation;
}

type GetSpaceFn = (blocks: Array<BlockUnit>, startIndex?: number) => number;

const getFreeSpace: GetSpaceFn = (blocks, startIndex) => {
  let offSet = 0;
  if (startIndex && startIndex >= 0) { offSet = startIndex; }

  for (let i = offSet; i < blocks.length; i++) {
    if (blocks[i].id === undefined) { return i; }
  }

  return -1;
};

type TrimFn = (blocks: Array<BlockUnit>) => Array<BlockUnit>;

const trimSpace: TrimFn = (blocks) => {
  const trimmed = blocks;
  if (trimmed.length === 0) { return trimmed; }

  while (trimmed.slice(-1).pop()?.id === undefined) {
    trimmed.pop();
  }

  return trimmed;
};

type CalculateFn = (blocks: Array<BlockUnit>) => number;

const calculateChecksum: CalculateFn = (blocks) => {
  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].id;
    if (!block) { continue; }
    checksum += (i * block);
  }
  return checksum;
};

export { solution, getDiskAllocation, calculateChecksum };