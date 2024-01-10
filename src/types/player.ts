import { PieceColor } from './piece'
import { User } from './user'

export class Player {
  constructor (
    public readonly user: User,
    public readonly color: PieceColor
  ) {}
}
