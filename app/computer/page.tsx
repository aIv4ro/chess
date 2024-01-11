'use client'

import { BoardProvider } from '../components/board/board-provider'
import { ComputerBoard } from '../components/computer-board/computer-board'
import { PieceColor } from '../lib/types/piece'
import { Player } from '../lib/types/player'
import { User } from '../lib/types/user'

const players = {
  whitePlayer: new Player(
    new User('Guest', '/images/guest.webp', 0, 'es'),
    PieceColor.White
  ),
  blackPlayer: new Player(
    new User('Computer', '/images/guest.webp', 0, 'es'),
    PieceColor.Black
  )
}

export default function ComputerPage () {
  return (
    <main className='flex-1 grid place-content-center'>
      <BoardProvider players={players} >
        <ComputerBoard />
      </BoardProvider>
    </main>
  )
}
