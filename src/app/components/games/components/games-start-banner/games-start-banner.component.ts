import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GamesBannerData } from '../../models/games-start-banner.model';

@Component({
  selector: 'app-games-start-banner',
  templateUrl: './games-start-banner.component.html',
  styleUrls: ['./games-start-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesStartBannerComponent {
  @Input() banner: GamesBannerData;

  @Output() startGame = new EventEmitter();

  start(): void {
    this.startGame.emit();
  }
}
