import { Component, Input } from '@angular/core';

import { Word } from '../../../../../../common/models/word.model';

@Component({
  selector: 'app-games-sprint-card',
  templateUrl: './games-sprint-card.component.html',
  styleUrls: ['./games-sprint-card.component.scss'],
})
export class GamesSprintCardComponent {
  @Input() word: Word;

  @Input() translation: Word;
}
