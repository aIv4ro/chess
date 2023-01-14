import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { Square } from 'src/app/models/piece';
import { loadBoardFromFen } from 'src/app/utils/loadBoardFromFen';

@Component({
	selector: 'app-game-board',
	templateUrl: './game-board.component.html',
	styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
	audio = new Audio('/assets/move-self.webm');
	board: Board = loadBoardFromFen();
	selectedSquare?: Square;

	onSquareClick(square: Square) {
		const isSelectableSquare = this.selectedSquare === undefined && (
			square.type === undefined || square.color !== this.board.turn
		);
		if (isSelectableSquare || this.selectedSquare === square) {
			this.selectedSquare = undefined;
			return;
		}
		if (this.selectedSquare === undefined) this.selectedSquare = square;
		else this.moveSquare(this.selectedSquare, square);
	}

	moveSquare(from: Square, to: Square) {
		this.audio.play();
		const fromIndex = from.row * 8 + from.col;
		const toIndex = to.row * 8 + to.col;
		this.board.squares[toIndex] = new Square(
			to.row, to.col, from.type, from.color
		);
		this.board.squares[fromIndex] = new Square(
			from.row, from.col, undefined, undefined
		);
		this.selectedSquare = undefined;
		this.board.changeTurn();
	}
}
