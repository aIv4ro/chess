import { Square } from './piece';

export class Move {
	from: Square;
	to: Square;
	coronation?: boolean;

	constructor(
		from: Square, to: Square, coronation?: boolean
	) {
		this.from = from;
		this.to = to;
		this.coronation = coronation;
	}
}
