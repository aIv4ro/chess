import { Board } from '../models/board';

export function loadBoardFromFen(
	fen: string
): Board {
	return new Board([]);
}