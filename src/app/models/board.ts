import { PieceColor } from '../enums/piece-color';
import { Square } from './piece';

export class Board {
	squares: (Square)[];
	turn = PieceColor.white;

	constructor(
		pieces: (Square)[]
	) { 
		this.squares = pieces;
	}

	changeTurn() {
		this.turn = this.turn === PieceColor.white ? PieceColor.black : PieceColor.white;
	}
}
