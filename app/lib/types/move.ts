import { type Nullable } from 'vitest'
import { type Square } from './square'
import { type Piece } from './piece'

export class Move {
  public readonly from: Square
  public readonly to: Square
  public readonly enPassant: Nullable<Square> = null
  public readonly castle: Nullable<Move> = null
  public readonly promotion: boolean
  public promotionPiece: Nullable<Piece> = null
  public readonly isReverse: boolean

  constructor ({
    from,
    to,
    enPassant,
    castle,
    promotion = false,
    promotionPiece = null,
    isReverse = false
  }: {
    from: Square
    to: Square
    enPassant?: Nullable<Square>
    castle?: Nullable<Move>
    promotion?: boolean
    promotionPiece?: Nullable<Piece>
    isReverse?: boolean
  }) {
    this.from = from
    this.to = to
    this.enPassant = enPassant
    this.castle = castle
    this.promotion = promotion
    this.promotionPiece = promotionPiece
    this.isReverse = isReverse
  }

  public clone (): Move {
    return new Move({
      from: this.from.clone(),
      to: this.to.clone(),
      enPassant: this.enPassant?.clone(),
      castle: this.castle?.clone(),
      promotion: this.promotion,
      promotionPiece: this.promotionPiece?.clone()
    })
  }

  public reverse (): Move {
    return new Move({
      from: this.to.clone(),
      to: this.from.clone(),
      enPassant: this.enPassant?.clone(),
      castle: this.castle?.reverse(),
      promotion: false,
      promotionPiece: null,
      isReverse: true
    })
  }
}
