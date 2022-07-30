import { GameSavannahLangs } from './game-savannah-langs.enum';

export interface GameSavannahStatus {
  errors: number;
  progressError?: string;
  sound: boolean;
  currentLang: GameSavannahLangs;
  wordsCount?: number;
  currentCounts?: number;
  progressAll?: string;
}
