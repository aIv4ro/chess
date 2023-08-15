import { useMemo } from 'react'
import { Square } from '../types/square'
import { useBoardContext } from './use-board-context'

export function useSquare ({
  square
}: {
  square: Square
}) {
  const { board, selectedSquare, availableMoves, selectSuquare, unselectSquare, execMove } = useBoardContext()

  const isEven = useMemo(() => {
    return (square.file + square.rank) % 2 === 0
  }, [square.file, square.rank])

  const asset = useMemo(() => {
    return square?.piece?.getAsset()
  }, [square.piece])

  const isSelectedSquare = useMemo(() => {
    return selectedSquare === square
  }, [selectedSquare, square])

  const isTurnPiece = useMemo(() => {
    return board.turn === square.piece?.color
  }, [board.turn, square.piece?.color])

  const targetMove = useMemo(() => {
    return availableMoves.find(move => move.to.identifier === square.identifier)
  }, [availableMoves, square.identifier])

  const isTargetPiece = useMemo(() => {
    return targetMove != null
  }, [targetMove])

  const squareClick = () => {
    if (isTurnPiece) {
      if (selectedSquare == null || selectedSquare !== square) {
        selectSuquare(square)
        return
      }
      if (selectedSquare === square) {
        unselectSquare()
        return
      }
    }
    if (selectedSquare != null && targetMove != null) {
      execMove(targetMove)
    }
  }

  return { isTurnPiece, isEven, asset, isTargetPiece, isSelectedSquare, squareClick }
}
