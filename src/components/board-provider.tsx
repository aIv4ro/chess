import { BoardContext } from '../hooks/board-context'
import { useBoard } from '../hooks/use-board'

export function BoardProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const boardState = useBoard()
  return (
    <BoardContext.Provider value={boardState}>
      {children}
    </BoardContext.Provider>
  )
}
