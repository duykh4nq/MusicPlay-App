import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HomeMusicComponent } from './home-music/home-music.component';
import { RightMusicAppComponent } from './right-music-app/right-music-app.component';
import { LeftMusicAppComponent } from './left-music-app/left-music-app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMusicComponent,
    RightMusicAppComponent,
    LeftMusicAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
