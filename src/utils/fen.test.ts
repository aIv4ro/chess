import { assert, expect, test } from 'vitest'
import { getBoardFromFEN, getFENFromBoard } from './fen'
import { Board } from '../types/board'
import { Piece, PieceColor, PieceType } from '../types/piece'
import { Square } from '../types/square'

const defaultBoard = new Board(
  PieceColor.White,
  [
    new Square(0, 7, new Piece(PieceType.Rook, PieceColor.Black)),
    new Square(1, 7, new Piece(PieceType.Knight, PieceColor.Black)),
    new Square(2, 7, new Piece(PieceType.Bishop, PieceColor.Black)),
    new Square(3, 7, new Piece(PieceType.Queen, PieceColor.Black)),
    new Square(4, 7, new Piece(PieceType.King, PieceColor.Black)),
    new Square(5, 7, new Piece(PieceType.Bishop, PieceColor.Black)),
    new Square(6, 7, new Piece(PieceType.Knight, PieceColor.Black)),
    new Square(7, 7, new Piece(PieceType.Rook, PieceColor.Black)),
    new Square(0, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(1, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(2, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(3, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(4, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(5, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(6, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(7, 6, new Piece(PieceType.Pawn, PieceColor.Black)),
    new Square(0, 5, null),
    new Square(1, 5, null),
    new Square(2, 5, null),
    new Square(3, 5, null),
    new Square(4, 5, null),
    new Square(5, 5, null),
    new Square(6, 5, null),
    new Square(7, 5, null),
    new Square(0, 4, null),
    new Square(1, 4, null),
    new Square(2, 4, null),
    new Square(3, 4, null),
    new Square(4, 4, null),
    new Square(5, 4, null),
    new Square(6, 4, null),
    new Square(7, 4, null),
    new Square(0, 3, null),
    new Square(1, 3, null),
    new Square(2, 3, null),
    new Square(3, 3, null),
    new Square(4, 3, null),
    new Square(5, 3, null),
    new Square(6, 3, null),
    new Square(7, 3, null),
    new Square(0, 2, null),
    new Square(1, 2, null),
    new Square(2, 2, null),
    new Square(3, 2, null),
    new Square(4, 2, null),
    new Square(5, 2, null),
    new Square(6, 2, null),
    new Square(7, 2, null),
    new Square(0, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(1, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(2, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(3, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(4, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(5, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(6, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(7, 1, new Piece(PieceType.Pawn, PieceColor.White)),
    new Square(0, 0, new Piece(PieceType.Rook, PieceColor.White)),
    new Square(1, 0, new Piece(PieceType.Knight, PieceColor.White)),
    new Square(2, 0, new Piece(PieceType.Bishop, PieceColor.White)),
    new Square(3, 0, new Piece(PieceType.Queen, PieceColor.White)),
    new Square(4, 0, new Piece(PieceType.King, PieceColor.White)),
    new Square(5, 0, new Piece(PieceType.Bishop, PieceColor.White)),
    new Square(6, 0, new Piece(PieceType.Knight, PieceColor.White)),
    new Square(7, 0, new Piece(PieceType.Rook, PieceColor.White))
  ],
  {
    kingSide: true,
    queenSide: true
  },
  {
    kingSide: true,
    queenSide: true
  }
)

test('fen decode', () => {
  const board = getBoardFromFEN()
  expect(board).toBeInstanceOf(Board)
  expect(board.turn).toBe(PieceColor.White)
  expect(board.squares.length).toBe(64)
  assert.deepEqual(board.whiteCastle, { kingSide: true, queenSide: true })
  assert.deepEqual(board.blackCastle, { kingSide: true, queenSide: true })
  assert.deepEqual(board, defaultBoard)

  const board2 = getBoardFromFEN('r1bq1rk1/ppppn1pp/2n2p2/2b1p3/1P2P3/P1NB1N2/2PP1PPP/R1BQ1RK1 b - b3 0 1')
  expect(board2).toBeInstanceOf(Board)
  expect(board2.turn).toBe(PieceColor.Black)
  expect(board2.squares.length).toBe(64)
  assert.deepEqual(board2.whiteCastle, { kingSide: false, queenSide: false })
  assert.deepEqual(board2.blackCastle, { kingSide: false, queenSide: false })
  assert.deepEqual(board2.squares[0], new Square(0, 7, new Piece(PieceType.Rook, PieceColor.Black)))
  assert.deepEqual(board2.squares[1], new Square(1, 7, null))
  assert.deepEqual(board2.squares[2], new Square(2, 7, new Piece(PieceType.Bishop, PieceColor.Black)))
})

test('fen encode', () => {
  const fen = getFENFromBoard(defaultBoard)
  expect(fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq')
})
