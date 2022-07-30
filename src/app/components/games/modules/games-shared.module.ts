import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { AngularMaterialModule } from 'src/app/shared/material/material.module';
import { FullScreenForGamesComponent } from '../components/full-screen-for-games/full-screen-for-games.component';
import { GamesEndComponent } from '../components/games-end/games-end.component';
import { GamesStartBannerComponent } from '../components/games-start-banner/games-start-banner.component';

@NgModule({
  declarations: [FullScreenForGamesComponent, GamesEndComponent, GamesStartBannerComponent],
  imports: [AngularMaterialModule, MatSortModule],
  exports: [
    FullScreenForGamesComponent,
    GamesEndComponent,
    AngularMaterialModule,
    MatSortModule,
    GamesStartBannerComponent,
  ],
})
export class GamesSharedModule {}
