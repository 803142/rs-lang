import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { GamesSettingsComponent } from './components/games-settings/games-settings.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesSettingsDialogComponent } from './components/games-settings-dialog/games-settings-dialog.component';

@NgModule({
  declarations: [
    GamesListComponent,
    GamesItemComponent,
    GamesSettingsComponent,
    GamesSettingsDialogComponent,
  ],
  imports: [CommonModule, HttpClientModule, GamesRoutingModule, SharedModule],
})
export class GamesModule {}
