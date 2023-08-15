export class Piece {
  constructor (
    public readonly type: PieceType,
    public readonly color: PieceColor
  ) {}

  clone () {
    return new Piece(this.type, this.color)
  }

  getAsset () {
    return `/pieces/${this.color}-${this.type}.png`
  }
}

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
