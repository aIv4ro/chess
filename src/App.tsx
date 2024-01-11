import { Toaster } from 'react-hot-toast'
import { Board } from './components/board/board'
import { BoardProvider } from './components/board/board-provider'
import { Header } from './components/header'

function App () {
  return (
    <div className='flex flex-col h-full'>
      <Header />
      <main className='flex-1 grid place-content-center'>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </main>
      <Toaster position='bottom-right' />
    </div>
  )
}

export default App
