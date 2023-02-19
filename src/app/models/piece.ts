import { PieceColor } from '../enums/piece-color';
import { PieceType } from '../enums/piece-type';
import { Board } from './board';
import { Move } from './move';

export class Square {
	row: number;
	col: number;
	type?: PieceType;
	color?: PieceColor;

	constructor(
		row: number, col:number, type?: PieceType, color?: PieceColor
	) {
		this.row = row;
		this.col = col;
		this.type = type;
		this.color = color;
	}

	get index() {
		return this.row * 8 + this.col;
	}

	getAvailableMoves(board: Board): Move[] {
		if (this.type === undefined || this.color === undefined) return [];
		if (this.type === PieceType.pawn) {
			return this.color === PieceColor.white 
				? getWhitePawnMoves(this, board) 
				: getBlackPawnMoves(this, board);
		}
		if (this.type === PieceType.knight) {
			return getKnightMoves(this, board);
		}
		if (this.type === PieceType.king) {
			return getKingMoves(this, board);
		}
		if (this.type === PieceType.bishop) {
			return getBishopMoves(this, board);
		}
		if (this.type === PieceType.rook) {
			return getRookMoves(this, board);
		}
		if (this.type === PieceType.queen) {
			return [
				...getBishopMoves(this, board),
				...getRookMoves(this, board)
			];
		}
		return [];
	}
}

function getWhitePawnMoves(from: Square, board: Board): Move[] {
	// [-8, -16, -7, -9];
	const fromIndex = from.index;
	const {squares} = board;
	const moves: Move[] = [];
	if (fromIndex - 8 >= 0 && squares[fromIndex - 8]?.type === undefined) {
		const toRow = getRow(fromIndex - 8);
		moves.push(new Move(from, squares[fromIndex - 8], toRow === 0));
	}
	if (from.row === 6 && fromIndex - 16 >= 0 && squares[fromIndex - 16]?.type === undefined && squares[fromIndex - 8]?.type === undefined) {
		moves.push(new Move(from, squares[fromIndex - 16]));
	}
	if (fromIndex - 7 >= 0) {
		const attackSquare = squares[fromIndex - 7];
		if (attackSquare.type !== undefined && attackSquare.color !== PieceColor.white && getDistance({jumpSquare: fromIndex - 7, row: from.row, col: from.col}) === 1) {
			moves.push(new Move(from, attackSquare, attackSquare.row === 0));
		}
	}
	if (fromIndex - 9 >= 0) {
		const attackSquare = squares[fromIndex - 9];
		if (attackSquare.type !== undefined && attackSquare.color !== PieceColor.white && getDistance({jumpSquare: fromIndex - 9, row: from.row, col: from.col}) === 1) {
			moves.push(new Move(from, attackSquare, attackSquare.row === 0));
		}
	}
	return moves;
}

function getBlackPawnMoves(from: Square, board: Board): Move[] {
	// [8, 16, 7, 9];
	const fromIndex = from.index;
	const {squares} = board;
	const moves: Move[] = [];
	if (fromIndex + 8 < 64 && squares[fromIndex + 8]?.type === undefined) {
		const toRow = getRow(fromIndex + 8);
		moves.push(new Move(from, squares[fromIndex + 8], toRow === 7));
	}
	if (from.row === 1 && fromIndex + 16 < 64 && squares[fromIndex + 16]?.type === undefined && squares[fromIndex + 8]?.type === undefined) {
		moves.push(new Move(from, squares[fromIndex + 16]));
	}
	if (fromIndex + 7 < 64) {
		const attackSquare = squares[fromIndex + 7];
		if (attackSquare.type !== undefined && attackSquare.color !== PieceColor.black && getDistance({jumpSquare: fromIndex + 7, row: from.row, col: from.col})) {
			moves.push(new Move(from, attackSquare, attackSquare.row === 7));
		}
	}
	if (fromIndex + 9 < 64) {
		const attackSquare = squares[fromIndex + 9];
		if (attackSquare.type !== undefined && attackSquare.color !== PieceColor.black && getDistance({jumpSquare: fromIndex + 9, row: from.row, col: from.col})) {
			moves.push(new Move(from, attackSquare, attackSquare.row === 9));
		}
	}
	return moves;
}

function getKnightMoves(from: Square, board: Board): Move[] {
	const dirs = [15, 17, -17, -15, 10, -6, 6, -10];
	const {squares} = board;
	return dirs
		.map(dir => {
			const jumpSquare = from.index + dir;
			return {
				jumpSquare, distance: getDistance({jumpSquare, row: from.row, col: from.col})
			};
		}).filter(({jumpSquare, distance}) => {
			return jumpSquare >= 0 && jumpSquare < 64 && distance === 2 && squares[jumpSquare]?.color !== from.color; 
		}).map(({jumpSquare}) => {
			return new Move(from, squares[jumpSquare]);
		});
}

function getKingMoves(from: Square, board: Board): Move[] {
	const directions = [1, -1, 8, -8, 7, -7, 9, -9];
	const {squares} = board;
	const fromIndex = from.index;
	const moves: Move[] = [];
	for (const dir of directions) {
		const jumpSquare = fromIndex + dir;
		const distance = getDistance({jumpSquare, row: from.row, col: from.col});
		if (jumpSquare < 0 || jumpSquare >= 64 || distance !== 1) continue;
		const toSquare = squares[jumpSquare];
		if (toSquare.color === from.color) continue;
		moves.push(new Move(from, toSquare));
	}
	return moves;
}

function getBishopMoves(from: Square, board: Board): Move[] {
	const directions = [7, 9, -7, -9];
	const {squares} = board;
	const fromIndex = from.index;
	const moves: Move[] = [];
	for (const dir of directions) {
		for(let jumpSquare = fromIndex + dir; jumpSquare >= 0 && jumpSquare < 64; jumpSquare += dir) {
			const prevSquare = jumpSquare - dir;
			const row = Math.floor(prevSquare / 8);
			const col = prevSquare - row * 8;
			const distanceToPrev = getDistance({
				jumpSquare, row, col 
			});
			if (distanceToPrev !== 1) break;
			const toSquare = squares[jumpSquare];
			if (toSquare.color === from.color) {break;}
			moves.push(new Move(from, toSquare));
			if (toSquare.type !== undefined) break;
		}
	}
	return moves;
}

function getRookMoves(from: Square, board: Board): Move[] {
	const directions = [8, -8, -1, 1];
	const {squares} = board;
	const fromIndex = from.index;
	const moves: Move[] = [];
	for (const dir of directions) {
		for(let jumpSquare = fromIndex + dir; jumpSquare >= 0 && jumpSquare < 64; jumpSquare += dir) {
			const prevSquare = jumpSquare - dir;
			const row = Math.floor(prevSquare / 8);
			const col = prevSquare - row * 8;
			const distanceToPrev = getDistance({
				jumpSquare, row, col 
			});
			if (distanceToPrev !== 1) break;
			const toSquare = squares[jumpSquare];
			if (toSquare.color === from.color) {break;}
			moves.push(new Move(from, toSquare));
			if (toSquare.type !== undefined) break;
		}
	}
	return moves;
}

function getRow(index: number) {
	return Math.floor(index / 8);
}

function getDistance(
	{jumpSquare, row, col}: {jumpSquare: number, row: number, col: number}
): number {
	const squareY = getRow(jumpSquare);
	const squareX = jumpSquare - squareY * 8;
	return Math.max(Math.abs(col - squareX), Math.abs(row - squareY));
}