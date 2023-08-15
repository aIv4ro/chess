import { useEffect, useState } from 'react'
import { Board } from '../types/board'
import { getBoardFromFEN } from '../utils/fen'
import { Nullable } from 'vitest'
import { Square } from '../types/square'
import { getSquareMoves } from '../utils/moves'
import { Move } from '../types/move'
import { Piece } from '../types/piece'
import { MatchState } from '../types/game-state'

export function useBoard () {
  const [board, setBoard] = useState<Board>(getBoardFromFEN())
  const [selectedSquare, setSelectedSquare] = useState<Nullable<Square>>()
  const [availableMoves, setAvailableMoves] = useState<Move[]>([])
  const [promotion, setPromotion] = useState<{
    show: boolean
    move: Nullable<Move>
    piece: Nullable<Piece>
  }>({
    show: false,
    move: null,
    piece: null
  })
  const [matchState, setMatchState] = useState<MatchState>()

  useEffect(() => {
    setMatchState(board.getMatchState())
  }, [board, setMatchState])

  useEffect(() => { console.log(matchState) }, [matchState])

  const selectSuquare = (square: Square) => {
    setSelectedSquare(square)
    const moves = getSquareMoves({ board, square })
    setAvailableMoves(moves)
  }

  const unselectSquare = () => {
    setSelectedSquare(null)
    setAvailableMoves([])
  }

  const resetPromotion = () => {
    setPromotion({
      show: false,
      move: null,
      piece: null
    })
  }

  const handlePromotion = (piece: Piece) => {
    if (promotion.move == null) return
    const move = new Move({
      ...promotion.move,
      promotion: true,
      promotionPiece: piece
    })
    execMove(move)
  }

  const execMove = (move: Move) => {
    if (!move.promotion || (move.promotion && move.promotionPiece != null)) {
      board.move(move)
      unselectSquare()
      resetPromotion()
      setMatchState(board.getMatchState())
      return
    }
    setPromotion({
      ...promotion,
      show: true,
      move
    })
  }

  const resetGame = () => {
    setBoard(getBoardFromFEN())
  }

  return {
    board,
    selectedSquare,
    availableMoves,
    promotion,
    matchState,
    selectSuquare,
    unselectSquare,
    execMove,
    handlePromotion,
    resetGame
  }
}
