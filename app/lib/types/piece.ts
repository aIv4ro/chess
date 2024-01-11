export const enum PieceType {
  Pawn = 'p',
  Knight = 'n',
  Bishop = 'b',
  Rook = 'r',
  Queen = 'q',
  King = 'k',
}

export const enum PieceColor {
  White = 'w',
  Black = 'b',
}

const pieceTypeValue = {
  [PieceType.Pawn]: 1,
  [PieceType.Knight]: 3,
  [PieceType.Bishop]: 3,
  [PieceType.Rook]: 5,
  [PieceType.Queen]: 9,
  [PieceType.King]: 0
}
export class Piece {
  public readonly value: number

  constructor (
    public readonly type: PieceType,
    public readonly color: PieceColor
  ) {
    this.value = pieceTypeValue[this.type]
  }

  clone () {
    return new Piece(this.type, this.color)
  }

  getAsset () {
    return `/pieces/${this.color}${this.type}.webp`
  }
}
