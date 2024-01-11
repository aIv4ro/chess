import { Board } from '../types/board'
import { Piece, PieceColor, PieceType } from '../types/piece'
import { Square } from '../types/square'
import { initialFEN } from './constants'

export function getFENFromBoard (board: Board): string {
  let emptySquares = 0
  const fillEmptySquares = (fen: string): string => {
    if (emptySquares > 0) {
      fen += `${emptySquares}`
      emptySquares = 0
    }
    return fen
  }
  const fen = board.squares.reduce((fen, square, index) => {
    const file = index % 8
    const rank = Math.floor(index / 8)
    if (file === 0 && rank !== 0) {
      fen = fillEmptySquares(fen)
      fen += '/'
    }
    if (square.piece != null) {
      fen = fillEmptySquares(fen)
      const pieceColor = square.piece.color === PieceColor.White ? 'w' : 'b'
      const pieceType = square.piece.type
      fen += pieceColor === 'w' ? pieceType.toUpperCase() : pieceType
    } else {
      emptySquares++
    }
    return fen
  }, '')
  let castle = ''
  if (board.whiteCastle.kingSide) castle += 'K'
  if (board.whiteCastle.queenSide) castle += 'Q'
  if (board.blackCastle.kingSide) castle += 'k'
  if (board.blackCastle.queenSide) castle += 'q'
  castle ??= '-'
  return `${fillEmptySquares(fen)} ${board.turn === PieceColor.White ? 'w' : 'b'} ${castle} - 0 1`
}

export function getBoardFromFEN (fen: string = initialFEN): Board {
  const [board, turn, castles] = fen.split(' ')
  const squares = board.split('/').flatMap((row, index) => {
    let file = 0
    const rank = 7 - index
    return row.split('').flatMap((char) => {
      const square = parseInt(char)
      if (!isNaN(square)) {
        return Array.from({ length: square }).map(() => {
          return new Square(file++, rank, null)
        })
      }
      const pieceColor = char === char.toUpperCase() ? PieceColor.White : PieceColor.Black
      const pieceType = char.toLowerCase() as PieceType
      const piece = new Piece(pieceType, pieceColor)
      return new Square(file++, rank, piece)
    })
  })
  const whiteCastle = {
    kingSide: castles.includes(PieceType.King.toUpperCase()),
    queenSide: castles.includes(PieceType.Queen.toUpperCase())
  }
  const blackCastle = {
    kingSide: castles.includes(PieceType.King.toLowerCase()),
    queenSide: castles.includes(PieceType.Queen.toLowerCase())
  }
  return new Board(turn as PieceColor, squares, whiteCastle, blackCastle)
}
