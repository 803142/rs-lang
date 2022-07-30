import { Component, Input, OnChanges } from '@angular/core';
import { IDailyStats } from 'src/app/common/models/stats.model';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss'],
})
export class ProfileShortComponent implements OnChanges {
  @Input() shortData: IDailyStats;

  learnedCount: number;

  rightPercent: number;

  ngOnChanges() {
    const { audio, myGame, savanna, sprint } = this.shortData;
    this.learnedCount = audio.learned + myGame.learned + savanna.learned + sprint.learned;
    this.rightPercent =
      ((audio.right + myGame.right + savanna.right + sprint.right) /
        (audio.tries + myGame.tries + savanna.tries + sprint.tries)) *
      100;
  }
}
