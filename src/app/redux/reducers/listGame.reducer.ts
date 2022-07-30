import { createReducer, on } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';
import { BackWord, gameWordsList } from '../actions/listGame.actions';

export const gameListFeatureKey = 'gameList';

export const initialState: Word[] = [];
export const gameListReducer = createReducer(
  initialState,
  on(gameWordsList, (state, { Words }) => [...Words]),
  on(BackWord, (state) => [...state]),
);
