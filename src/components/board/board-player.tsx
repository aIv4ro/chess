import { twMerge } from 'tailwind-merge'
import { useBoardContext } from '../../hooks/use-board-context'
import { Nullable } from '../../types/nullable'
import { Piece, PieceColor } from '../../types/piece'
import { Player } from '../../types/player'
import { FlagIcon } from '../icons/flags'

export function BoardPlayer ({
  player
}: {
  player: Nullable<Player>
}) {
  const { board } = useBoardContext()

  if (player == null) return null

  const { captureStack } = board

  return (
    <article className='flex self-start gap-2'>
      <picture className={
        twMerge(
          'w-10 h-10 overflow-hidden rounded border-2 border-transparent transition-colors',
          board.turn === player.color && 'border-green-400'
        )
      }
      >
        <img className='object-cover' src={player.user.avatar} alt={player.user.name} />
      </picture>
      <div className='flex flex-col text-sm'>
        <div className='flex items-center gap-2'>
          <h3 className='text-white font-semibold flex gap-1 items-center'>
            {player.user.name}
          </h3>
          <span className='text-gray-400'>({player.user.elo})</span>
          <FlagIcon code={player.user.nationality} className='w-5' />
        </div>
        <PlayerCaptures captureStack={captureStack} playerColor={player.color} />
      </div>
    </article>
  )
}

function PlayerCaptures ({
  captureStack,
  playerColor
}: {
  captureStack: Piece[]
  playerColor: PieceColor
}) {
  const playerCaptures = captureStack.filter(capture => capture.color !== playerColor)
  const playerCapturesByType = playerCaptures.reduce<Record<string, Piece[]>>((acc, capture) => {
    const type = capture.type
    acc[type] ??= []
    acc[type].push(capture)
    return acc
  }, {})

  const playerCapturesValues = Object.values(playerCapturesByType).sort(([firstA], [firstB]) => {
    return firstA.value - firstB.value
  })

  return (
    <div className='flex items-center'>
      {playerCapturesValues.map((captures, index) => {
        return (
          <div className='flex items-center' key={index}>
            {captures.map((capture, index) => {
              return (
                <img className={twMerge('w-5', index > 0 && '-ml-3')} key={index} src={capture.getAsset()} />
              )
            })}
          </div>
        )
      })}
      <PlayerScore captureStack={captureStack} playerColor={playerColor} />
    </div>
  )
}

function PlayerScore ({
  captureStack,
  playerColor
}: {
  captureStack: Piece[]
  playerColor?: PieceColor
}) {
  const { w, b } = captureStack.reduce<{ w: number, b: number }>((acc, capture) => {
    const oposityColor = capture.color === 'w' ? 'b' : 'w'
    acc[oposityColor] += capture.value
    return acc
  }, { w: 0, b: 0 })

  const [enemy, player] = playerColor === 'w' ? [b, w] : [w, b]

  if (enemy >= player) {
    return null
  }

  return (
    <span className='text-gray-400 font-normal'>
      +{player - enemy}
    </span>
  )
}
