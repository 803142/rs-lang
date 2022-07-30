import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../shared/shared.module';
import { AngularMaterialModule } from '../../../../shared/material/material.module';
import { GamesSprintPlayComponent } from './components/games-sprint-play/games-sprint-play.component';
import { GamesSprintCardComponent } from './components/games-sprint-card/games-sprint-card.component';
import { GamesSprintMainComponent } from './components/games-sprint-main/games-sprint-main.component';
import { GamesSprintRoutingModule } from './games-sprint-routing.module';
import { GamesSharedModule } from '../games-shared.module';

@NgModule({
  declarations: [GamesSprintMainComponent, GamesSprintPlayComponent, GamesSprintCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    GamesSprintRoutingModule,
    SharedModule,
    GamesSharedModule,
  ],
})
export class GamesSprintModule {}
