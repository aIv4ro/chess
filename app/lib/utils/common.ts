import { PieceColor } from '../types/piece'

const opposites = {
  [PieceColor.White]: PieceColor.Black,
  [PieceColor.Black]: PieceColor.White
}

export function opposite (color: PieceColor): PieceColor {
  return opposites[color]
}
