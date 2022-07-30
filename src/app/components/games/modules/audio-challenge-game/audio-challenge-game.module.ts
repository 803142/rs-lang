import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AudioChallengeItemComponent } from './components/audio-challenge-item/audio-challenge-item.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';
import { AudioChallengeGameRoutingModule } from './audio-challenge-game-routing.module';
import { AudioChallengeGameManageComponent } from './components/audio-challenge-game-manage/audio-challenge-game-manage.component';
import { AudioChallengeGameStartComponent } from './components/audio-challenge-game-start/audio-challenge-game-start.component';
import { AudioChallengeGameEndComponent } from './components/audio-challenge-game-end/audio-challenge-game-end.component';
import { GamesSharedModule } from '../games-shared.module';
import { AudioChallengeGameClosePauseComponent } from './components/audio-challenge-game-close-pause/audio-challenge-game-close-pause.component';
import { AudioChallengeGameClosePauseDialogueComponent } from './components/audio-challenge-game-close-pause-dialogue/audio-challenge-game-close-pause-dialogue.component';

@NgModule({
  declarations: [
    AudioChallengeItemComponent,
    AudioChallengeGameComponent,
    AudioChallengeGameManageComponent,
    AudioChallengeGameStartComponent,
    AudioChallengeGameEndComponent,
    AudioChallengeGameClosePauseComponent,
    AudioChallengeGameClosePauseDialogueComponent,
  ],
  imports: [
    CommonModule,
    AudioChallengeGameRoutingModule,
    SharedModule,
    MatSortModule,
    GamesSharedModule,
  ],
})
export class AudioChallengeGameModule {}
