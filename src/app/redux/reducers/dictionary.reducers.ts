import { createReducer, on } from '@ngrx/store';
import { ICurrentWords } from '../../common/models/aggregatedWords.model';
import * as dictionaryActions from '../actions/dictionary.actions';

export const dictionaryFeatureKey = 'dictionary';

export const initialDictionaryState: ICurrentWords = {
  paginatedResults: [],
  totalCount: 0,
  errorMessage: '',
};

export const dictionaryReducer = createReducer(
  initialDictionaryState,
  on(dictionaryActions.updateWordsSuccess, (state, action) => ({
    ...state,
    paginatedResults: [...action.paginatedResults],
    totalCount: action.totalCount,
  })),
  on(dictionaryActions.updateWordsFailure, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
  })),
);
