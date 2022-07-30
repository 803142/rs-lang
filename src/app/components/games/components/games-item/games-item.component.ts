import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GamesService } from '../../../../common/services/games.service';
import { GameModel } from '../../../../common/models/games.model';

@Component({
  selector: 'app-games-item',
  templateUrl: './games-item.component.html',
  styleUrls: ['./games-item.component.scss'],
  providers: [GamesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesItemComponent {
  @Input() game: GameModel;

  constructor(private gamesService: GamesService, private router: Router) {}
}
