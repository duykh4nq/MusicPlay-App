import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeMusicComponent } from './home-music/home-music.component';

const routes: Routes = [{ path: 'music', component: HomeMusicComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
