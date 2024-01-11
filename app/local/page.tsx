'use client'

import { BoardProvider } from '../components/board/board-provider'
import { LocalBoard } from '../components/local-board/local-board'

export default function LocalPage () {
  return (
    <main className='flex-1 grid place-content-center'>
      <BoardProvider>
        <LocalBoard />
      </BoardProvider>
    </main>
  )
}
