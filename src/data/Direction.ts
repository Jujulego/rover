// Enum
enum Direction {
  N = 0,  // 00000
  T = 3,  // 11000
  L = 5,  // 10100
  B = 9,  // 10010
  R = 17, // 10001

  TL = 7,  // 11100 = T | L
  BL = 13, // 10110 = B | L
  BR = 25, // 10011 = B | R
  TR = 19, // 11001 = T | R

  TLA = 6,  // 01100 = T ^ L
  BLA = 12, // 00110 = B ^ L
  BRA = 24, // 00011 = B ^ R
  TRA = 18, // 01001 = T ^ R
}

// Special types
export type DStrait = Direction.T | Direction.L | Direction.B | Direction.R;
export type DCombined = Direction.TL | Direction.BL | Direction.BR | Direction.TR;
export type DAngle = Direction.TLA | Direction.BLA | Direction.BRA | Direction.TRA;

export type DMove = DStrait | DAngle;
export type DBorder = DStrait | DCombined | DAngle;

// Converts
export function isStrait(dir: Direction): dir is DStrait {
  return (dir === Direction.T) || (dir === Direction.L) || (dir === Direction.B) || (dir === Direction.R);
}

export function isCombined(dir: Direction): dir is DCombined {
  return (dir === Direction.TL) || (dir === Direction.BL) || (dir === Direction.BR) || (dir === Direction.TR);
}

export function isAngle(dir: Direction): dir is DAngle {
  return (dir === Direction.TLA) || (dir === Direction.BLA) || (dir === Direction.BRA) || (dir === Direction.TRA);
}

export function isMove(dir: Direction): dir is DMove {
  return isStrait(dir) || isAngle(dir);
}

export function isBorder(dir: Direction): dir is DMove {
  return isStrait(dir) || isCombined(dir) || isAngle(dir);
}

// Constants
export const BORDERS: Array<DBorder> = [
  Direction.T, Direction.TL, Direction.TLA,
  Direction.L, Direction.BL, Direction.BLA,
  Direction.B, Direction.BR, Direction.BRA,
  Direction.R, Direction.TR, Direction.TRA
];
export const MOVES: Array<DMove> = [Direction.T, Direction.TLA, Direction.L, Direction.BLA, Direction.B, Direction.BRA, Direction.R, Direction.TRA];

export default Direction
