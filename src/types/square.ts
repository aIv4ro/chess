import { Nullable } from './nullable'
import { Piece } from './piece'

export class Square {
  public readonly identifier: string

  constructor (
    public readonly file: number,
    public readonly rank: number,
    public readonly piece: Nullable<Piece>
  ) {
    this.identifier = `${file}${rank}`
  }

  clone (): Square {
    return new Square(this.file, this.rank, this.piece?.clone())
  }
}
