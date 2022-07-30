import { createSelector } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState): ReadonlyArray<Word> => [...state.gameList];

export const selectGameList = () => createSelector(selectFeature, (words: Word[]) => words);
