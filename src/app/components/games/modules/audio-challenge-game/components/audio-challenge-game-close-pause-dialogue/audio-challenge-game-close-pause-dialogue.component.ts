import { Component } from '@angular/core';
import { AudioChallengeGameService } from '../../sevices/audio-challenge-game.service';

@Component({
  selector: 'app-audio-challenge-game-close-pause-dialogue',
  templateUrl: './audio-challenge-game-close-pause-dialogue.component.html',
  styleUrls: ['./audio-challenge-game-close-pause-dialogue.component.scss'],
})
export class AudioChallengeGameClosePauseDialogueComponent {
  constructor(private audioChallengeGameService: AudioChallengeGameService) {}

  closeTheGame() {}
}
