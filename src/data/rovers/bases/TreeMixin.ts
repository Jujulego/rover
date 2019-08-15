import Coords from 'data/Coords';

import RoverAI from './RoverAI';

// Type
export interface TNode {
  pos: Coords,
  from: Coords | null,
  obstacle?: boolean
}

// Interface
export default interface TreeMixin extends RoverAI {
  // Properties
  treeVersion(): number;

  // Methods
  getNode(pos: Coords): TNode | undefined;
  getChildren(node: TNode): Array<TNode>;
}

// Utils
export function hasTree(rover: RoverAI): rover is TreeMixin {
  return ('treeVersion' in rover) && ('getNode' in rover) && ('getChildren' in rover);
}