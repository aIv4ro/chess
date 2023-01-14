import { PieceColor } from '../enums/piece-color';
import { PieceType } from '../enums/piece-type';
import { Board } from './board';

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

	getAvailableMoves(board: Board): Square[] {
		return board.squares.filter(square => {
			return square.color !== this.color;
		});
	}
}
