import { GameMode } from './components/game-mode'
import { ComputerIcon } from './components/icons/computer-icon'
import { UsersIcon } from './components/icons/users-icon'

export default function HomePage () {
  return (
    <main className="max-w-2xl m-auto flex-1 flex flex-wrap gap-2 justify-center items-center">
      <GameMode
        href='/local'
        title='Player vs Player'
        description='Play against a friend on the same device.'
        icon={<UsersIcon className='w-20 h-20 grow' />}
        className='flex-1'
      />
      <GameMode
        href='/computer'
        title='Player vs Computer'
        description='Play against the computer.'
        icon={<ComputerIcon className='w-20 h-20' />}
        className='flex-1'
      />
    </main>
  )
}
