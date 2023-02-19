import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { PieceColor } from 'src/app/enums/piece-color';
import { PieceType } from 'src/app/enums/piece-type';
import { Board } from 'src/app/models/board';
import { Move } from 'src/app/models/move';
import { Square } from 'src/app/models/piece';
import { coronations } from 'src/app/utils/constants';
import { loadBoardFromFen } from 'src/app/utils/loadBoardFromFen';
import { CoronationDialogComponent } from '../coronation-dialog/coronation-dialog.component';

@Component({
	selector: 'app-game-board',
	templateUrl: './game-board.component.html',
	styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
	constructor(
		public dialog: MatDialog
	) {}

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
			const dialogRef = this.dialog.open(
				CoronationDialogComponent, {
					disableClose: true,
					data: {
						pieces: coronations,
						color: this.board.turn === PieceColor.white ? PieceColor.black : PieceColor.white,
					}
				},
			);
			dialogRef.afterClosed().pipe(
				map(res => res as PieceType)
			).subscribe(res => {
				if (!this.board.lastMove) return;
				const {row, col} = this.board.lastMove.to;
				console.log([...this.board.squares][7]);
				this.board.changePiece({piece: res, row, col});
				console.log([...this.board.squares][7]);
				this.board.squares = [...this.board.squares];
				this.playSound(movedTo);
				this.resetSelection();
			});
			return;
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
