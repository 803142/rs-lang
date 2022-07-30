export enum ActionType {
  updateWords = '[Dictionary] update words',
  updateWordsSuccess = '[Dictionary] update words success',
  updateWordsFailure = '[Dictionary] update words failure',
  startGame = '[Dictionary] start game',
  restoreWord = '[Dictionary] restore word',
  restoreWordSuccess = '[Dictionary] restore word success',
  restoreWordFailure = '[Dictionary] restore word failure',
  syncWord = '[Dictionary] sync words',
}

export interface IDictionaryOptions {
  userId: string;
  section: string;
  group: number;
  page: number;
  wordsPerPage: number;
}
