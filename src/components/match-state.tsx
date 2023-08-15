import { useBoardContext } from '../hooks/use-board-context'
import { PieceColor } from '../types/piece'
import { MatchState as MatchStateEnum } from '../types/game-state'

export function MatchState () {
  const { promotion, matchState, resetGame, board } = useBoardContext()
  if (promotion.show || matchState == null || matchState === MatchStateEnum.Other) {
    return null
  }
  return (
    <div className='absolute inset-0 grid place-content-center bg-zinc-900/70'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl font-bold text-center'>
          {matchState === MatchStateEnum.Checkmate
            ? (
              <div>
                <span>Checkmate!</span>
                <span> {board.turn === PieceColor.White ? 'Black' : 'White'} wins!</span>
              </div>
              )
            : 'Draw!'}
        </h1>
        <button
          className='px-3 py-2 rounded bg-slate-800 hover:bg-slate-600 transition-colors'
          onClick={resetGame}
        >Play Again
        </button>
      </div>
    </div>
  )
}
