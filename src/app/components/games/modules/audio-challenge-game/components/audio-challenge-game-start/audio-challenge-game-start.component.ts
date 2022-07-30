import { Component, Input } from '@angular/core';
import { GamesBannerData } from 'src/app/components/games/models/games-start-banner.model';
import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game-start',
  templateUrl: './audio-challenge-game-start.component.html',
  styleUrls: ['./audio-challenge-game-start.component.scss'],
})
export class AudioChallengeGameStartComponent {
  @Input()
  wordState;

  banner: GamesBannerData = {
    title: 'Аудиовызов',
    subtitle:
      'Мини-игра «Аудиовызов» - это тренировка, развивающая восприятие английского языка на слух.',
  };

  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  newGame() {
    this.audioChallengeGameService.gameStart();
  }
}
