import { BoardContext } from '../hooks/board-context'
import { useBoard } from '../hooks/use-board'
import { BoardSquare } from './board-square'
import { MatchState } from './match-state'
import { PiecePicker } from './piece-picker'

export function Board () {
  const boardState = useBoard()
  const { board } = boardState

  const handleCopyFen = () => {
    if (navigator.clipboard != null) {
      navigator.clipboard.writeText(board.getFen()).then().catch(err => console.log(err))
    }
  }

  return (
    <section className='flex flex-col justify-center items-center gap-3'>
      <BoardContext.Provider value={boardState}>
        <header>
          <button
            className='px-3 py-2 rounded bg-slate-800 hover:bg-slate-600 transition-colors'
            onClick={handleCopyFen}
          >Copy FEN
          </button>
        </header>
        <div className='flex justify-center'>
          <div className='grid grid-cols-[repeat(8,2.75rem)] sm:grid-cols-[repeat(8,3.5rem)] md:grid-cols-[repeat(8,4rem)] lg:grid-cols-[repeat(8,5rem)]'>
            {board.squares.map((square) => {
              return <BoardSquare key={square.identifier} square={square} />
            })}
          </div>
        </div>
        <PiecePicker />
        <MatchState />
      </BoardContext.Provider>
    </section>
  )
}
