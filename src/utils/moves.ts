import { Board } from '../types/board'
import { Move } from '../types/move'
import { Piece, PieceColor, PieceType } from '../types/piece'
import { Square } from '../types/square'

type SquareWithPiece = Square & { piece: Piece }
const squareWithPiece = (square: Square): square is SquareWithPiece => square.piece != null

export function getSquareMoves ({ board, square, filterChecks = true }: { board: Board, square: Square, filterChecks?: boolean }): Move[] {
  if (!squareWithPiece(square)) {
    return []
  }

  let moves: Move[] = []

  switch (square.piece.type) {
    case PieceType.Pawn:
      moves = getPawnMoves({ board, square })
      break
    case PieceType.Knight:
      moves = getKnightMoves({ board, square })
      break
    case PieceType.Bishop:
      moves = getBishopMoves({ board, square })
      break
    case PieceType.Rook:
      moves = getRookMoves({ board, square })
      break
    case PieceType.Queen:
      moves = getQueenMoves({ board, square })
      break
    case PieceType.King:
      moves = getKingMoves({ board, square })
      break
  }

  if (!filterChecks) {
    return moves
  }

  const boardCopy = board.clone()
  return moves.filter(move => {
    boardCopy.move(move)
    const isCheck = boardCopy.isCheck(square.piece.color)
    boardCopy.rollback()
    return !isCheck
  })
}

function getPawnMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  const { color } = square.piece
  const moves: Move[] = []
  const direction = color === PieceColor.White ? 1 : -1
  const nextRow = square.rank + direction
  const nextSquare = board.squares.find(s => s.rank === nextRow && s.file === square.file)
  if (nextSquare != null && !squareWithPiece(nextSquare)) {
    const promotion = nextRow === (color === PieceColor.White ? 7 : 0)
    moves.push(new Move({ from: square, to: nextSquare, promotion }))
    const nextNextRow = nextRow + direction
    const nextNextSquare = board.squares.find(s => s.rank === nextNextRow && s.file === square.file)
    if (nextNextSquare != null && !squareWithPiece(nextNextSquare) && square.rank === (color === PieceColor.White ? 1 : 6)) {
      moves.push(new Move({ from: square, to: nextNextSquare }))
    }
  }
  const leftColumn = square.file - 1
  const leftSquare = board.squares.find(s => s.rank === nextRow && s.file === leftColumn)
  if (leftSquare != null && squareWithPiece(leftSquare) && leftSquare.piece.color !== color) {
    const promotion = nextRow === (color === PieceColor.White ? 7 : 0)
    moves.push(new Move({ from: square, to: leftSquare, promotion }))
  }
  const rightColumn = square.file + 1
  const rightSquare = board.squares.find(s => s.rank === nextRow && s.file === rightColumn)
  if (rightSquare != null && squareWithPiece(rightSquare) && rightSquare.piece.color !== color) {
    const promotion = nextRow === (color === PieceColor.White ? 7 : 0)
    moves.push(new Move({ from: square, to: rightSquare, promotion }))
  }
  const { prevMove } = board
  if (prevMove != null && prevMove.from.piece?.type === PieceType.Pawn && prevMove.to.rank === square.rank && Math.abs(prevMove.to.rank - prevMove.from.rank) === 2) {
    const enPassantSquare = board.squares.find(s => s.rank === square.rank && s.file === prevMove.to.file)
    if (enPassantSquare != null && squareWithPiece(enPassantSquare) && enPassantSquare.piece.color !== color) {
      const targetSquare = board.squares.find(s => s.rank === nextRow && s.file === enPassantSquare.file)
      if (targetSquare != null) {
        moves.push(new Move({ from: square, to: targetSquare, enPassant: enPassantSquare }))
      }
    }
  }
  return moves
}

function getKnightMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  const posibleTargets = [
    { file: square.file - 2, rank: square.rank - 1 },
    { file: square.file - 2, rank: square.rank + 1 },
    { file: square.file - 1, rank: square.rank - 2 },
    { file: square.file - 1, rank: square.rank + 2 },
    { file: square.file + 1, rank: square.rank - 2 },
    { file: square.file + 1, rank: square.rank + 2 },
    { file: square.file + 2, rank: square.rank - 1 },
    { file: square.file + 2, rank: square.rank + 1 }
  ]
  const inBoardTargets = posibleTargets.filter(move => {
    return move.file >= 0 && move.file <= 7 && move.rank >= 0 && move.rank <= 7
  })
  const targetSquares = inBoardTargets.map(target => {
    const targetSquare = board.squares.find(s => s.file === target.file && s.rank === target.rank)
    if (targetSquare == null) throw new Error('Target square not found.')
    return targetSquare
  }).filter(targetSquare => {
    return !squareWithPiece(targetSquare) || targetSquare.piece.color !== square.piece.color
  })
  return targetSquares.map(targetSquare => {
    return new Move({ from: square, to: targetSquare })
  })
}

function getBishopMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  const moves: Move[] = []
  const { file, rank } = square
  const directions = [
    { file: -1, rank: -1 },
    { file: -1, rank: 1 },
    { file: 1, rank: -1 },
    { file: 1, rank: 1 }
  ]
  directions.forEach(direction => {
    let targetFile = file + direction.file
    let targetRank = rank + direction.rank
    while (targetFile >= 0 && targetFile <= 7 && targetRank >= 0 && targetRank <= 7) {
      const targetSquare = board.squares.find(s => s.file === targetFile && s.rank === targetRank)
      if (targetSquare == null) throw new Error('Target square not found.')
      if (squareWithPiece(targetSquare)) {
        if (targetSquare.piece.color !== square.piece.color) {
          moves.push(new Move({ from: square, to: targetSquare }))
        }
        break
      }
      moves.push(new Move({ from: square, to: targetSquare }))
      targetFile += direction.file
      targetRank += direction.rank
    }
  })
  return moves
}

function getRookMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  const moves: Move[] = []
  const { file, rank } = square
  const directions = [
    { file: -1, rank: 0 },
    { file: 1, rank: 0 },
    { file: 0, rank: -1 },
    { file: 0, rank: 1 }
  ]
  directions.forEach(direction => {
    let targetFile = file + direction.file
    let targetRank = rank + direction.rank
    while (targetFile >= 0 && targetFile <= 7 && targetRank >= 0 && targetRank <= 7) {
      const targetSquare = board.squares.find(s => s.file === targetFile && s.rank === targetRank)
      if (targetSquare == null) throw new Error('Target square not found.')
      if (squareWithPiece(targetSquare)) {
        if (targetSquare.piece.color !== square.piece.color) {
          moves.push(new Move({ from: square, to: targetSquare }))
        }
        break
      }
      moves.push(new Move({ from: square, to: targetSquare }))
      targetFile += direction.file
      targetRank += direction.rank
    }
  })
  return moves
}

function getQueenMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  return [
    ...getBishopMoves({ board, square }),
    ...getRookMoves({ board, square })
  ]
}

function getKingMoves ({ board, square }: { board: Board, square: SquareWithPiece }): Move[] {
  const moves: Move[] = []
  const { file, rank } = square
  const directions = [
    { file: -1, rank: -1 },
    { file: -1, rank: 0 },
    { file: -1, rank: 1 },
    { file: 0, rank: -1 },
    { file: 0, rank: 1 },
    { file: 1, rank: -1 },
    { file: 1, rank: 0 },
    { file: 1, rank: 1 }
  ]
  directions.filter(direction => {
    const targetFile = file + direction.file
    const targetRank = rank + direction.rank
    return targetFile >= 0 && targetFile <= 7 && targetRank >= 0 && targetRank <= 7
  }).forEach(direction => {
    const targetFile = file + direction.file
    const targetRank = rank + direction.rank
    const targetSquare = board.squares.find(s => s.file === targetFile && s.rank === targetRank)
    if (targetSquare == null) throw new Error('Target square not found.')
    if (!squareWithPiece(targetSquare) || targetSquare.piece.color !== square.piece.color) {
      moves.push(new Move({ from: square, to: targetSquare }))
    }
  })
  const castle = square.piece.color === PieceColor.White ? board.whiteCastle : board.blackCastle
  const castleFiles: number[][] = []
  if (castle.kingSide) castleFiles.push([5, 6])
  if (castle.queenSide) castleFiles.push([1, 2, 3])
  for (const castleFile of castleFiles) {
    const rookFile = castleFile.length === 2 ? 7 : 0
    const rookSquare = board.squares.find(s => s.file === rookFile && s.rank === square.rank)
    if (rookSquare != null && squareWithPiece(rookSquare) && rookSquare.piece.type === PieceType.Rook && rookSquare.piece.color === square.piece.color) {
      const emptySquares = castleFile.map(file => board.squares.find(s => s.file === file && s.rank === square.rank))
      if (emptySquares.every(s => s != null && !squareWithPiece(s))) {
        const rookToIndex = castleFile.length === 2 ? 0 : emptySquares.length - 1
        const rookMove = new Move({ from: rookSquare, to: emptySquares[rookToIndex] as Square })
        const kingMove = new Move({ from: square, to: emptySquares[1] as Square, castle: rookMove })
        moves.push(kingMove)
      }
    }
  }
  return moves
}
