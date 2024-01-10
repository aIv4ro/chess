import { useBoardContext } from '../hooks/use-board-context'
import { PieceColor } from '../types/piece'
import { MatchState as MatchStateEnum } from '../types/game-state'
import { Player } from '../types/player'
import { Nullable } from '../types/nullable'
import { twMerge } from 'tailwind-merge'

export function MatchState () {
  const { promotion, matchState, resetGame, board, whitePlayer, blackPlayer } = useBoardContext()

  if (promotion.show || matchState == null || matchState === MatchStateEnum.Other) {
    return null
  }

  let winner: Nullable<Player> = null

  if (matchState === MatchStateEnum.Checkmate) {
    winner = board.turn === PieceColor.White ? blackPlayer : whitePlayer
  }

  return (
    <section className='absolute inset-0 grid place-content-center bg-zinc-900/70'>
      <div className='flex flex-col gap-3 bg-zinc-900 rounded overflow-hidden'>
        <header className='bg-zinc-950 pt-4 px-10 pb-10'>
          <h3 className='text-2xl font-bold text-center'>
            {winner != null
              ? winner.user.name + ' wins!'
              : 'Draw!'}
          </h3>
        </header>
        <div className='flex flex-col p-4 gap-4 relative pt-20'>
          <div className='flex justify-center gap-3 items-center absolute left-0 right-0 -top-8'>
            <PlayerInfo player={whitePlayer!} isWinner={whitePlayer === winner} />
            <span className='font-bold text-sm text-gray-400'>VS</span>
            <PlayerInfo player={blackPlayer!} isWinner={blackPlayer === winner} />
          </div>
          <button
            className='px-3 py-2 rounded bg-slate-800 hover:bg-slate-600 transition-colors'
            onClick={resetGame}
          >
            Rematch
          </button>
        </div>
      </div>
    </section>
  )
}

function PlayerInfo ({
  player,
  isWinner
}: {
  player: Player
  isWinner: boolean
}) {
  const border = player.color === PieceColor.White ? 'border-white' : 'border-black'

  return (
    <article className='flex flex-col gap-1 justify-center items-center'>
      <picture className={twMerge('w-14 border-[3px] rounded overflow-hidden',
        isWinner ? 'border-green-400' : border)}
      >
        <img src={player.user.avatar} />
      </picture>
      <h4 className='text-sm text-center w-[12ch] text-ellipsis overflow-hidden whitespace-nowrap'>{player.user.name}</h4>
    </article>
  )
}
