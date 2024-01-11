import { useBoardContext } from '../../hooks/use-board-context'
import { PieceColor } from '../../lib/types/piece'
import { MatchState as MatchStateEnum } from '../../lib/types/game-state'
import { type Player } from '../../lib/types/player'
import { type Nullable } from '../../lib/types/nullable'
import { twMerge } from 'tailwind-merge'
import { Button } from '../common/button'

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
    <section className='absolute inset-0 grid place-content-center bg-primary/70'>
      <div className='flex flex-col gap-3 bg-primary rounded overflow-hidden'>
        <header className='bg-secondary pt-4 px-10 pb-10'>
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
          <Button
            className=''
            onClick={resetGame}
          >
            Rematch
          </Button>
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
        <img alt={player.user.name} src={player.user.avatar} />
      </picture>
      <h4 className='text-sm text-center w-[12ch] text-ellipsis overflow-hidden whitespace-nowrap font-semibold'>
        {player.user.name}
        </h4>
    </article>
  )
}
