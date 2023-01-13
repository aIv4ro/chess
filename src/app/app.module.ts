import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';

@NgModule({
	declarations: [
		AppComponent,
		GameBoardComponent,
		AppBarComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }