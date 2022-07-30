import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AudioChallengeState } from '../../models/game-adio-challenge.model';
import { AudioChallengeGameClosePauseDialogueComponent } from '../audio-challenge-game-close-pause-dialogue/audio-challenge-game-close-pause-dialogue.component';

@Component({
  selector: 'app-audio-challenge-game-close-pause',
  templateUrl: './audio-challenge-game-close-pause.component.html',
  styleUrls: ['./audio-challenge-game-close-pause.component.scss'],
})
export class AudioChallengeGameClosePauseComponent {
  constructor(private dialog: MatDialog) {}

  @Input() wordState: AudioChallengeState;

  openClosePauseDialogue() {
    this.dialog.open(AudioChallengeGameClosePauseDialogueComponent, {
      width: '480px',
    });
  }
}
