'use client'

import { Board } from '../components/board/board'
import { BoardProvider } from '../components/board/board-provider'

export default function LocalPage () {
  return (
    <main className='flex-1 grid place-content-center'>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </main>
  )
}
