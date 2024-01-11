import { type PieceColor } from './piece'
import { type User } from './user'

export class Player {
  constructor (
    public readonly user: User,
    public readonly color: PieceColor
  ) {}
}
