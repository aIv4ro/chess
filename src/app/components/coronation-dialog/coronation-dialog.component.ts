import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PieceColor } from 'src/app/enums/piece-color';
import { PieceType } from 'src/app/enums/piece-type';

@Component({
	selector: 'app-coronation-dialog',
	templateUrl: './coronation-dialog.component.html',
	styleUrls: ['./coronation-dialog.component.scss']
})
export class CoronationDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<CoronationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {pieces: PieceType[], color: PieceColor}
	) {}
}
