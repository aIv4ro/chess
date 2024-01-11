import { useEffect, useState } from 'react'
import { type Board } from '../lib/types/board'
import { getBoardFromFEN } from '../lib/utils/fen'
import { type Nullable } from 'vitest'
import { type Square } from '../lib/types/square'
import { getSquareMoves } from '../lib/utils/moves'
import { Move } from '../lib/types/move'
import { type Piece } from '../lib/types/piece'
import { type MatchState } from '../lib/types/game-state'
import { type Player } from '../lib/types/player'

export interface Players {
  whitePlayer: Nullable<Player>
  blackPlayer: Nullable<Player>
}

export function useBoard ({
  initialPlayers
}: {
  initialPlayers: Players | null
} = {
  initialPlayers: null
}) {
  const [board, setBoard] = useState<Board>(getBoardFromFEN())
  const [players, setPlayers] = useState<Players | null>(
    initialPlayers
  )
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
  }, [board])

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
    players,
    selectedSquare,
    availableMoves,
    promotion,
    matchState,
    selectSuquare,
    unselectSquare,
    execMove,
    handlePromotion,
    resetGame,
    setPlayers
  }
}
