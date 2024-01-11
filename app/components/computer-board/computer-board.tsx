import { useEffect } from 'react'
import { Board } from '../board/board'
import { useBoardContext } from '../../hooks/use-board-context'
import { getAllTurnMoves } from '../../lib/utils/moves'
import { Piece, PieceColor, PieceType } from '../../lib/types/piece'

export function ComputerBoard () {
  const { board, execMove } = useBoardContext()

  useEffect(() => {
    if (board.turn === 'b') {
      const allMoves = getAllTurnMoves({ board })
      if (allMoves.length === 0) {
        return
      }
      const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)]
      if (randomMove.promotion) {
        randomMove.promotionPiece = new Piece(PieceType.Queen, PieceColor.Black)
      }
      execMove(randomMove)
    }
  }, [board, execMove])

  return (
    <Board />
  )
}
