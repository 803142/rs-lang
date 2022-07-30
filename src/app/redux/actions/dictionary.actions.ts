import { createAction, props } from '@ngrx/store';
import { IHttpAnswer, Word } from '../../common/models/word.model';
import { ActionType } from '../models/dictionaryAction.models';

export const updateWords = createAction(ActionType.updateWords);

export const updateWordsSuccess = createAction(
  ActionType.updateWordsSuccess,
  props<{ paginatedResults: Word[]; totalCount: number; errorMessage?: string }>(),
);

export const updateWordsFailure = createAction(ActionType.updateWordsSuccess, props<any>());

export const startGameFromDictionary = createAction(
  ActionType.startGame,
  props<{ words: Word[] }>(),
);

export const restoreWord = createAction(ActionType.restoreWord, props<{ word: Word }>());

export const restoreWordSuccess = createAction(
  ActionType.restoreWordSuccess,
  props<{ word: IHttpAnswer }>(),
);

export const syncWords = createAction(
  ActionType.syncWord,
  props<{ word: Word; user: IHttpAnswer }>(),
);

export const restoreWordFailure = createAction(ActionType.restoreWordFailure, props<any>());
