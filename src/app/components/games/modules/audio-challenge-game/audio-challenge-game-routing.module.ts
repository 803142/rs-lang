import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';

const routes: Routes = [
  {
    path: '',
    component: AudioChallengeGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioChallengeGameRoutingModule {}
