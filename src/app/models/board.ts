import { PieceColor } from '../enums/piece-color';
import { Square } from './piece';

export class Board {
	squares: (Square)[];
	turn = PieceColor.white;
	lastMove?: Square;

	constructor(
		pieces: (Square)[]
	) { 
		this.squares = pieces;
	}

	changeTurn() {
		this.turn = this.turn === PieceColor.white ? PieceColor.black : PieceColor.white;
	}
  
	move(square: Square, to: Square): boolean {
		const availableMoves = square.getAvailableMoves(this);
		if (!availableMoves.includes(to)) return false; 
		this.squares[to.index] = new Square(to.row, to.col, square.type, square.color);
		this.squares[square.index] = new Square(square.row, square.col, undefined, undefined);
		this.changeTurn();
		return true;
	}
}
