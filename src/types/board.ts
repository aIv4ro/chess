import { Move } from './move'
import { Piece, PieceColor, PieceType } from './piece'
import { Square } from './square'
import { Castle } from './castle'
import { Nullable } from 'vitest'
import { getSquareMoves } from '../utils/moves'
import { getFENFromBoard } from '../utils/fen'
import { MatchState } from './game-state'

export class Board {
  constructor (
    public turn: PieceColor,
    public readonly squares: Square[],
    public whiteCastle: Castle,
    public blackCastle: Castle,
    public moveStack: Move[] = [],
    public whiteCastleStack: Castle[] = [],
    public blackCastleStack: Castle[] = []
  ) {}

  clone (): Board {
    return new Board(
      this.turn,
      this.squares.map(square => square.clone()),
      { ...this.whiteCastle },
      { ...this.blackCastle },
      this.moveStack.map(move => move.clone()),
      this.whiteCastleStack.map(castle => ({ ...castle })),
      this.blackCastleStack.map(castle => ({ ...castle }))
    )
  }

  get prevMove (): Nullable<Move> {
    return this.moveStack[this.moveStack.length - 1]
  }

  changeTurn () {
    this.turn = this.turn === PieceColor.White ? PieceColor.Black : PieceColor.White
  }

  clearCasttling (color: PieceColor) {
    if (color === PieceColor.White) {
      this.whiteCastle = {
        kingSide: false,
        queenSide: false
      }
    } else {
      this.blackCastle = {
        kingSide: false,
        queenSide: false
      }
    }
  }

  isCheck (color: PieceColor): boolean {
    const king = this.squares.find(square => square.piece?.color === color && square.piece?.type === PieceType.King)
    if (king == null) return false
    const enemyColor = color === PieceColor.White ? PieceColor.Black : PieceColor.White
    const enemyPieces = this.squares.filter(square => square.piece?.color === enemyColor)
    for (const square of enemyPieces) {
      const moves = getSquareMoves({ board: this, square, filterChecks: false })
      if (moves.some(move => move.to.identifier === king.identifier)) return true
    }
    return false
  }

  getMatchState (): MatchState {
    const turnSquares = this.squares.filter(square => square.piece?.color === this.turn)
    const hasMoves = turnSquares.some(square => getSquareMoves({ board: this, square, filterChecks: true }).length > 0)
    if (hasMoves) return MatchState.Other
    const isCheck = this.isCheck(this.turn)
    if (isCheck) return MatchState.Checkmate
    return MatchState.Stalemate
  }

  move (move: Move, changeTurn = true) {
    this.updateSquares(move)
    this.moveStack.push(move)
    if (changeTurn) this.changeTurn()
  }

  updateSquares (move: Move, isRollback = false) {
    const { from, to, enPassant, castle } = move
    const fromBoardIndex = this.squares.findIndex(square => square.identifier === from.identifier)
    const toBoardIndex = this.squares.findIndex(square => square.identifier === to.identifier)
    const toPiece = move.promotion ? move.promotionPiece : from.piece
    this.squares[toBoardIndex] = new Square(to.file, to.rank, isRollback ? to.piece?.clone() : toPiece)
    this.squares[fromBoardIndex] = new Square(from.file, from.rank, isRollback ? from.piece?.clone() ?? null : null)
    if (enPassant != null) {
      const enPassantBoardIndex = this.squares.findIndex(square => square.identifier === enPassant.identifier)
      if (move.isReverse) {
        const pieceColor = this.turn === PieceColor.White ? PieceColor.Black : PieceColor.White
        this.squares[enPassantBoardIndex] = new Square(enPassant.file, enPassant.rank, new Piece(PieceType.Pawn, pieceColor))
      } else {
        this.squares[enPassantBoardIndex] = new Square(enPassant.file, enPassant.rank, null)
      }
    }
    if (castle != null) {
      if (!isRollback) {
        this.move(castle, false)
        this.clearCasttling(from.piece!.color)
      } else {
        this.rollback(false)
        this.rollbackCastle(to.piece!.color)
      }
    }
  }

  rollback (changeTurn = true) {
    if (this.prevMove == null) return
    const move = this.prevMove.reverse()
    this.moveStack.pop()
    this.updateSquares(move, true)
    if (changeTurn) this.changeTurn()
  }

  rollbackCastle (color: PieceColor) {
    if (color === PieceColor.White) {
      this.whiteCastle = this.whiteCastleStack.pop()!
    } else {
      this.blackCastle = this.blackCastleStack.pop()!
    }
  }

  getFen (): string {
    return getFENFromBoard(this)
  }
}
