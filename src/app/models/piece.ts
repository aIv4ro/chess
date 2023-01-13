import { PieceColor } from '../enums/piece-color';
import { PieceType } from '../enums/piece-type';

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
}
