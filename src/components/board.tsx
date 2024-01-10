import { useBoardContext } from '../hooks/use-board-context'
import { BoardPlayer } from './board-player'
import { BoardSquare } from './board-square'
import { MatchState } from './match-state'
import { PiecePicker } from './piece-picker'

export function Board () {
  const { board, blackPlayer, whitePlayer } = useBoardContext()

  return (
    <section className='flex flex-col justify-center items-center gap-3'>
      <BoardPlayer player={blackPlayer} />
      <div className='flex justify-center'>
        <div className='grid grid-cols-[repeat(8,2.75rem)] sm:grid-cols-[repeat(8,3.5rem)] md:grid-cols-[repeat(8,4rem)] lg:grid-cols-[repeat(8,5rem)]'>
          {board.squares.map((square) => {
            return <BoardSquare key={square.identifier} square={square} />
          })}
        </div>
      </div>
      <BoardPlayer player={whitePlayer} />
      <PiecePicker />
      <MatchState />
    </section>
  )
}
