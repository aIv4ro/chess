import { Component } from '@angular/core';
import { loadBoardFromFen } from 'src/app/utils/loadBoardFromFen';

@Component({
	selector: 'app-game-board',
	templateUrl: './game-board.component.html',
	styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
	board = loadBoardFromFen();
}
