import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { SquareBackgroundImagePipe } from './pipes/square-background-image.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoronationDialogComponent } from './components/coronation-dialog/coronation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
	declarations: [
		AppComponent,
		GameBoardComponent,
		AppBarComponent,
		SquareBackgroundImagePipe,
		CoronationDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatRippleModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }