import { PieceColor } from '../enums/piece-color';
import { PieceType } from '../enums/piece-type';
import { Board } from '../models/board';
import { Square } from '../models/piece';
import { startFen } from './constants';

const pieceTypeFromSymbol: {[key: string]: PieceType} = {
	'b': PieceType.bishop,
	'k': PieceType.king,
	'n': PieceType.knight,
	'p': PieceType.pawn,
	'q': PieceType.queen,
	'r': PieceType.rook,
};

const isDigit = (str: string) => !isNaN(parseInt(str));

export function loadBoardFromFen(
	fen: string = startFen
): Board {
	const boardDistribution = fen.split(' ').at(0) ?? '';
	const board = new Board([]);
	let row = 0, col = 0;
	const jumpRow = () => { row++; col = 0; };
	const fillEmpty = (count: number) => {
		Array.from(Array(count), () => board.squares[row * 8 + col] = new Square(row, col++));
	};
	boardDistribution.split('').forEach(symbol => {
		if (symbol === '/') return jumpRow();
		if (isDigit(symbol)) return fillEmpty(parseInt(symbol));
		const pieceColor = symbol.toLowerCase() === symbol ? PieceColor.black : PieceColor.white;
		const pieceType = pieceTypeFromSymbol[symbol.toLowerCase()];
		board.squares[row * 8 + col] = new Square(row, col++, pieceType, pieceColor);
	});
	return board;
}