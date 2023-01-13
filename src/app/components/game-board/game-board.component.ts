import { Component } from '@angular/core';

@Component({
	selector: 'app-game-board',
	templateUrl: './game-board.component.html',
	styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
	board = [
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()],
		[...Array(10).keys()]
	];
}
