import { Board } from './components/board'

function App () {
  return (
    <div className='flex flex-col h-full'>
      <h1 className='text-xl'>Chess Game</h1>
      <main className='flex-1 grid place-content-center'>
        <Board />
      </main>
    </div>
  )
}

export default App
