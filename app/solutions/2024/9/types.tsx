export enum BlockType {
  File = '#',
  Free = '.',
}

export type Block = {
  type: BlockType,
  space: number,
};

export interface FileBlock extends Block {
  id: number,
};

export type InputData = {
  blocks: Array<Block>,
};

export type BlockUnit = {
  id?: number,
};
