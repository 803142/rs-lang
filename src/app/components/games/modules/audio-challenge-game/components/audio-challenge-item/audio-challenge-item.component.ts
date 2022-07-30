import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { GAME_LENGTH } from '../../constants/audio-challenge.constants';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-item',
  templateUrl: './audio-challenge-item.component.html',
  styleUrls: ['./audio-challenge-item.component.scss'],
})
export class AudioChallengeItemComponent implements OnChanges {
  apiUrl = URL_BACK_SERVER.URL_BACK;

  gameLength = GAME_LENGTH;

  @Input()
  wordState: AudioChallengeState;

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { wordState } = changes;
    if (wordState.currentValue.currentWord.audio && wordState.currentValue.isGameStarted) {
      this.playWordAudio();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (+event.key > 0 && +event.key < 6) {
      this.makeChoice(+event.key - 1);
    }
    if (event.key === 'Enter') {
      if (this.wordState.isTranslationChoosed) {
        this.audioChallengeGameService.nextWord();
      } else {
        const index = undefined;
        this.audioChallengeGameService.makeTurn(index);
      }
    }
    if (event.key === ' ') {
      this.playWordAudio();
    }
  }

  makeChoice(index: number) {
    this.audioChallengeGameService.makeTurn(index);
  }

  playWordAudio() {
    if (!this.wordState.isGameEnded) {
      const audio = new Audio();
      audio.src = this.apiUrl + this.wordState.currentWord.audio;
      audio.play();
    }
  }
}
