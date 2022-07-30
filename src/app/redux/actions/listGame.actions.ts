import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';

export enum ArticlesActionsGameList {
  GameWordsList = '[GameWordsList] GameWordsList',
  LoadListGame = '[LoadListGame] LoadListGame',
  BackWord = '[Back Word] Back Word',
}

export const gameWordsList = createAction(
  ArticlesActionsGameList.GameWordsList,
  props<{ Words: Word[] }>(),
);

export const LoadListGame = createAction(
  ArticlesActionsGameList.LoadListGame,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);
export const BackWord = createAction(ArticlesActionsGameList.BackWord);
