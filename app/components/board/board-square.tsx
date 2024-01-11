import { type Square } from '../../lib/types/square'
import { useSquare } from '../../hooks/use-square'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export function BoardSquare ({
  square
}: {
  square: Square
}) {
  const { isEven, asset, isTurnPiece, isTargetPiece, isSelectedSquare, squareClick } = useSquare({ square })

  const handleClick = () => {
    squareClick()
  }

  const bg = useMemo(() => {
    if (isSelectedSquare) {
      return isEven ? '#F5F780' : '#BCCD44'
    }
    return isEven ? '#779952' : '#EDEED1'
  }, [isEven, isSelectedSquare])

  const clickable = isTurnPiece || isTargetPiece

  return (
    <div
      className={twMerge(
        'w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-colors border border-gray-500 relative',
        isTargetPiece && 'after:w-3 after:h-3 after:bg-black/50 after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:z-10'
      )}
      style={{
        backgroundColor: bg,
        cursor: clickable ? 'pointer' : 'auto'
      }}
      onClick={clickable ? handleClick : undefined}
    >
      {asset != null && (<img src={asset} alt={`piece ${square.piece?.type}`} />)}
    </div>
  )
}
