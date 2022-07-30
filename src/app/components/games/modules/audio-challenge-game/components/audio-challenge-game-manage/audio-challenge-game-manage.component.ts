import { Component, Input } from '@angular/core';

import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game-manage',
  templateUrl: './audio-challenge-game-manage.component.html',
  styleUrls: ['./audio-challenge-game-manage.component.scss'],
})
export class AudioChallengeGameManageComponent {
  @Input()
  wordState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  skipWord() {
    const index = undefined;
    this.audioChallengeGameService.makeTurn(index);
  }

  nextWord() {
    this.audioChallengeGameService.nextWord();
  }
}
