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
		return board.squares.filter(square => {
			return square.color !== this.color;
		}).map(square => new Move(this, square));
	}
}
