'use client'

import { type Players } from '../../hooks/use-board'
import { useBoardContext } from '../../hooks/use-board-context'
import { PieceColor } from '../../lib/types/piece'
import { Player } from '../../lib/types/player'
import { User } from '../../lib/types/user'
import { Board } from '../board/board'
import { Button } from '../common/button'

export function LocalBoard () {
  const { setPlayers, players } = useBoardContext()

  console.log(players)

  return (
    players != null
      ? (<Board />)
      : (<PlayersForm setPlayers={setPlayers} />)
  )
}

function PlayersForm ({
  setPlayers
}: {
  setPlayers: React.Dispatch<React.SetStateAction<Players | null>>
}) {
  function handleSubmit (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const player1Name: string = (event.target as any)['player-1'].value || 'Guest 01'
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const player2Name: string = (event.target as any)['player-2'].value || 'Guest 02'
    console.log({ player1Name, player2Name })

    const user1 = new User(player1Name, '/images/guest.webp', 0, 'es')
    const player1 = new Player(user1, PieceColor.White)

    const user2 = new User(player2Name, '/images/guest.webp', 0, 'es')
    const player2 = new Player(user2, PieceColor.White)

    setPlayers({
      whitePlayer: player1,
      blackPlayer: player2
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 bg-secondary rounded p-8'
    >
      <h2 className='text-3xl font-semibold'>Player vs Player</h2>
      <h3 className='text-xl'>Enter player names (optional):</h3>
      <label className='flex flex-col'>
        Player 1 name
        <input placeholder='Name' id='player-1' className='bg-primary p-2' />
      </label>
      <label className='flex flex-col'>
        Player 2 name
        <input placeholder='Name' id='player-2' className='bg-primary p-2' />
      </label>
      <Button className='bg-primary hover:bg-primary/50 mt-4'>
        Start
      </Button>
    </form>
  )
}
