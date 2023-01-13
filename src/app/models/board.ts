import { Piece } from './piece';

export class Board {
	squares: (Piece)[];

	constructor(
		pieces: (Piece)[]
	) { 
		this.squares = pieces;
	}
}
