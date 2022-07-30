import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game-end',
  templateUrl: './audio-challenge-game-end.component.html',
  styleUrls: ['./audio-challenge-game-end.component.scss'],
})
export class AudioChallengeGameEndComponent implements OnChanges, OnDestroy {
  @Input() wordState: AudioChallengeState;

  dataSource;

  url = URL_BACK_SERVER;

  constructor(
    private audioChallengeGameService: AudioChallengeGameService,
    private router: Router,
  ) {}

  ngOnChanges(): void {
    this.dataSource = [...this.wordState?.resultList].map((item) => {
      return { ...item.word, result: item.result };
    });
  }

  submitResult(ev: boolean): void {
    if (ev) {
      this.audioChallengeGameService.gameStart();
    } else {
      this.router.navigate(['/games']);
    }
  }

  ngOnDestroy(): void {
    this.audioChallengeGameService.closeGame();
  }
}
