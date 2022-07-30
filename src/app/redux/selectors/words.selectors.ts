import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Word } from 'src/app/common/models/word.model';
import { AppState } from '../app.state';

export const selectWordState = createFeatureSelector<AppState, ReadonlyArray<Word>>('words');

export const selectWords = createSelector(selectWordState, (words: ReadonlyArray<Word>) => words);
