import { Component } from '@angular/core';
import { Board } from 'src/app/models/board';
import { Move } from 'src/app/models/move';
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
	selectedSquareMoves: Move[] = [];
	posibleTargets: Square[] = [];

	readonly letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	onSquareClick(square: Square) {
		const isSelectableSquare = this.selectedSquare === undefined && (
			square.type === undefined || square.color !== this.board.turn
		);
		if (isSelectableSquare || this.selectedSquare === square) {
			this.resetSelection();
			return;
		}
		if (this.selectedSquare === undefined || this.selectedSquare.color === square.color) {
			this.selectedSquare = square;
			this.selectedSquareMoves = square.getAvailableMoves(this.board);
			this.posibleTargets = this.selectedSquareMoves.map(({to}) => to);
			return;
		}
		const {hasMove, movedTo, coronation} = this.board.move(this.selectedSquare, square);
		if (!hasMove || movedTo === undefined) return;
		if (coronation) {

		}
		this.playSound(movedTo);
		this.resetSelection();
	}

	resetSelection() {
		this.selectedSquare = undefined;
		this.selectedSquareMoves = [];
		this.posibleTargets = [];
	}

	playSound(movedTo: Square) {
		const soundPath = `/assets/${movedTo.color === undefined ? 'move-self' : 'capture'}.webm`;
		this.audio.src = soundPath;
		this.audio.play();
	}
}
