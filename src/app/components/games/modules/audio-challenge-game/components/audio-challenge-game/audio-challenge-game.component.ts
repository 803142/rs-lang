import { Component, OnDestroy, OnInit } from '@angular/core';

import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game',
  templateUrl: './audio-challenge-game.component.html',
  styleUrls: ['./audio-challenge-game.component.scss'],
})
export class AudioChallengeGameComponent implements OnInit, OnDestroy {
  wordState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnInit(): void {
    this.wordState = this.audioChallengeGameService.getStateChange();
  }

  newGame() {
    this.audioChallengeGameService.gameStart();
  }

  ngOnDestroy(): void {
    this.audioChallengeGameService.closeGame();
  }
}
