import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSavannahLangs } from '../../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../../models/game-savannah-status.model';

@Component({
  selector: 'app-game-savannah-head',
  templateUrl: './game-savannah-head.component.html',
  styleUrls: ['./game-savannah-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahHeadComponent {
  @Input() gameSavannahStatus: GameSavannahStatus;

  @Output() changeStatus = new EventEmitter();

  @Output() restartGame = new EventEmitter();

  attempts = new Array(5);

  changeLang(key: string): void {
    this.gameSavannahStatus.currentLang = GameSavannahLangs[key];
    this.changeStatus.emit(this.gameSavannahStatus);
  }

  changeSound(): void {
    this.gameSavannahStatus.sound = !this.gameSavannahStatus.sound;
    this.changeStatus.emit(this.gameSavannahStatus);
  }

  restart(): void {
    this.restartGame.emit();
  }
}
