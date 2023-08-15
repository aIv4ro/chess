import { useContext } from 'react'
import { BoardContext } from './board-context'

export function useBoardContext () {
  const boardContext = useContext(BoardContext)
  if (boardContext == null) {
    throw new Error('useBoardContext must be used within a BoardProvider')
  }
  return boardContext
}
