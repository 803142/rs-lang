import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../common/guards/login.guard';

import { GamesListComponent } from './components/games-list/games-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamesListComponent,
      },
      {
        path: 'sprint',
        loadChildren: () =>
          import('./modules/games-sprint/games-sprint.module').then((m) => m.GamesSprintModule),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
      },
      {
        path: 'audio',
        loadChildren: () =>
          import('./modules/audio-challenge-game/audio-challenge-game.module').then(
            (m) => m.AudioChallengeGameModule,
          ),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
      },
      {
        path: 'savanna',
        loadChildren: () =>
          import('./modules/game-savannah/game-savannah.module').then((m) => m.GameSavannahModule),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
      },
      {
        path: 'my-game',
        loadChildren: () => import('./modules/my-game/my-game.module').then((m) => m.MyGameModule),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
