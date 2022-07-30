import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { Word } from 'src/app/common/models/word.model';
import { AppState } from '../app.state';
import { wordsFeatureKey } from '../reducers/words.reducer';

export const selectFeature = (state: AppState): ReadonlyArray<AggregatedWordsRedux> => [
  ...state.words,
];

export const selectFeatureWords = (state: AppState): ReadonlyArray<Word> => [
  ...state.words[0].paginatedResults,
];

export const selectWords = createSelector(selectFeature, (state: AggregatedWordsRedux[]) => state);

export const selectWordsByGroup = (group: number) =>
  createSelector(selectFeature, (state: AggregatedWordsRedux[]) => {
    return [
      {
        ...state[0],
        paginatedResults: state[0].paginatedResults.filter(
          (el) => el.group === group && el.userWord?.difficulty !== 'deleted',
        ),
      },
    ];
  });

export const selectBoolLengthWordsByGroup = (group: number, page: number, wordsPerPage: number) =>
  createSelector(
    selectFeatureWords,
    (words: Word[]) =>
      words.filter((el) => el.group === group).length === (page + 1) * wordsPerPage,
  );

export const selectBoolLengthWordsByGroupAndDeleted = (
  group: number,
  page: number,
  wordsPerPage: number,
) =>
  createSelector(
    selectFeatureWords,
    (words: Word[]) =>
      words.filter((el) => el.group === group && el.userWord?.difficulty === 'deleted').length ===
      (page + 1) * wordsPerPage,
  );

export const wordsInCards = createFeatureSelector(wordsFeatureKey);
export const selectWordById = (wordId: string) =>
  createSelector(selectFeatureWords, (words: Word[]) => words.find((el) => el._id === wordId));

export const wordsInCardsArr = createSelector(
  wordsInCards,
  (state: ReadonlyArray<AggregatedWordsRedux>) => state[0].paginatedResults,
);
