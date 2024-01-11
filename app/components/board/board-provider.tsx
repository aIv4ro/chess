import { BoardContext } from '../../hooks/board-context'
import { type Players, useBoard } from '../../hooks/use-board'

export function BoardProvider ({
  children,
  players
}: {
  children: React.ReactNode
  players?: Players
}) {
  const boardState = useBoard({
    initialPlayers: players ?? null
  })
  return (
    <BoardContext.Provider value={boardState}>
      {children}
    </BoardContext.Provider>
  )
}
