import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameSavannahLangs } from '../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../models/game-savannah-status.model';

@Injectable({
  providedIn: 'root',
})
export class GameSavannahService {
  private status = new BehaviorSubject<GameSavannahStatus>({
    errors: 0,
    sound: true,
    currentLang: GameSavannahLangs.en,
    currentCounts: 0,
    wordsCount: 0,
  });

  data = this.status.asObservable();

  updateGameStatus(data: GameSavannahStatus): void {
    this.status.next({ ...this.data, ...data });
  }
}
