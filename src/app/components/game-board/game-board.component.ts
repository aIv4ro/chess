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

	readonly letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	onSquareClick(square: Square) {
		const isSelectableSquare = this.selectedSquare === undefined && (
			square.type === undefined || square.color !== this.board.turn
		);
		if (isSelectableSquare || this.selectedSquare === square) {
			this.selectedSquare = undefined;
			return;
		}
		if (this.selectedSquare === undefined || this.selectedSquare.color === square.color) {
			this.selectedSquare = square;
			return;
		}
		const hasMove = this.board.move(this.selectedSquare, square);
		if (!hasMove) return;
		this.audio.play();
		this.selectedSquare = undefined;
	}
}
