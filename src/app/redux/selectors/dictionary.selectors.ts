import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrentWords } from 'src/app/common/models/aggregatedWords.model';
import { dictionaryFeatureKey } from '../reducers/dictionary.reducers';

export const selectLogin = createFeatureSelector(dictionaryFeatureKey);
export const wordsDictionary = createSelector(
  selectLogin,
  (state: ICurrentWords) => state.paginatedResults,
);
export const totalCount = createSelector(selectLogin, (state: ICurrentWords) => state.totalCount);
