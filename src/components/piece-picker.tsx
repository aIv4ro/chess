import { useBoardContext } from '../hooks/use-board-context'
import { Piece, PieceType } from '../types/piece'

const types = [PieceType.Queen, PieceType.Rook, PieceType.Knight, PieceType.Bishop]

export function PiecePicker () {
  const { promotion, handlePromotion } = useBoardContext()
  const pieceColor = promotion.move?.from.piece?.color

  if (!promotion.show) {
    return null
  }

  if (pieceColor == null) {
    throw new Error('Piece color must be defined')
  }

  return (
    <div className='absolute inset-0 grid place-content-center bg-zinc-900/70'>
      <div className='bg-zinc-800 flex rounded'>
        {
        types.map((pieceType, index) => {
          const asset = `/pieces/${pieceColor}-${pieceType}.png`
          return (
            <button
              key={index}
              onClick={() => {
                const piece = new Piece(pieceType, pieceColor)
                handlePromotion(piece)
              }}
              className='w-11 h-11 sm:w-12 sm:h-12 border border-gray-500'
            >
              <img src={asset} />
            </button>
          )
        })
      }
      </div>
    </div>
  )
}
