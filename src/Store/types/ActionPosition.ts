import { BlockPositionFieldName } from '../../BlockPosition/BlockPositionFieldName';

export type ActionPosition = {
    blockPositionFieldName: BlockPositionFieldName;
    actionIndex: number;
    position: number;
};
