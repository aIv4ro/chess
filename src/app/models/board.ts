import { Piece } from './piece';

export class Board {
	pieces: (Piece | undefined)[];

	constructor(
		pieces: (Piece | undefined)[]
	) { 
		this.pieces = pieces;
	}
}
