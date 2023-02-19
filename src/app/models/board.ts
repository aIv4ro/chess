import { PieceColor } from '../enums/piece-color';
import { PieceType } from '../enums/piece-type';
import { Move } from './move';
import { Square } from './piece';

interface MoveResult {
  hasMove: boolean, movedTo?: Square, coronation?: boolean
}

export class Board {
	squares: Square[];
	turn = PieceColor.white;
	lastMove?: Move;
	readonly directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];
	readonly numOfSuqaresToEdge: number[][] = [];

	constructor(
		squares: Square[]
	) { 
		this.squares = squares;
		this.generateNumOfSquaresToEdge();
	}

	generateNumOfSquaresToEdge() {
		for (let row = 0; row < 8; row++) {
			const west = row;
			const east = 7 - row;
			for (let col = 0; col < 8; col++) {
				const south = col;
				const north = 7 - col;
				const index = row * 8 + col;
				this.numOfSuqaresToEdge[index] = [
					north, south, west, east, Math.min(north, west),
					Math.min(south, west), Math.min(south, east), 
					Math.min(north, east),
				];
			}
		}
	}

	changeTurn() {
		this.turn = this.turn === PieceColor.white ? PieceColor.black : PieceColor.white;
	}
  
	move(square: Square, to: Square): MoveResult {
		const availableMoves = square.getAvailableMoves(this);
		const move = availableMoves.find(move => move.to === to);
		if (move === undefined) return {hasMove: false, movedTo: undefined}; 
		this.squares[to.index] = new Square(to.row, to.col, square.type, square.color);
		this.squares[square.index] = new Square(square.row, square.col, undefined, undefined);
		this.changeTurn();
		this.lastMove = move;
		return {hasMove: true, movedTo: to, coronation: move.coronation};
	}

	changePiece({piece, row, col}: { piece: PieceType, row: number, col: number }) {
		const index = row * 8 + col;
		this.squares[index].type = piece;
	}
}
