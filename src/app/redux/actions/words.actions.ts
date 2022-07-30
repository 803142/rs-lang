import { createAction, props } from '@ngrx/store';
import { AggregatedWords } from 'src/app/common/models/aggregatedWords.model';
import { Word } from '../../common/models/word.model';

export enum ArticlesActions {
  LoadWords = '[Words Page] Load Words',
  LoadDeletedWords = '[Words Page] Load deleted Words',
  LoadHardWords = '[Words Page] Load hard Words',
  RetrievedWordSuccess = '[Word List/API] Retrieve Words Success',
  BackWord = '[Back Word] Back Word',
  AddDifficulty = '[Add difficulty] Add difficulty',
  LoadDifficulty = '[Load difficulty] Add difficulty to back',
  addWords = '[Words Page] add words to paginateResult',
  AddStatWords = '[Statistic Word] add stat word',
  LoadStatWords = '[Statistic Word] load stat word',
}

export const retrievedWordsList = createAction(
  ArticlesActions.RetrievedWordSuccess,
  props<{ Words: AggregatedWords[] }>(),
);

export const AddStatWords = createAction(
  ArticlesActions.AddStatWords,
  props<{
    wordId: string;
    error: boolean;
  }>(),
);

export const LoadStatWords = createAction(
  ArticlesActions.LoadStatWords,
  props<{
    word: Word;
    error: boolean;
  }>(),
);

export const LoadWords = createAction(
  ArticlesActions.LoadWords,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);

export const LoadDeletedWords = createAction(
  ArticlesActions.LoadDeletedWords,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);

export const LoadHardWords = createAction(
  ArticlesActions.LoadHardWords,
  props<{ group: number; page: number; wordsPerPage: number }>(),
);

export const AddDifficultyWords = createAction(
  ArticlesActions.AddDifficulty,
  props<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }>(),
);

export const LoadDifficultyWords = createAction(
  ArticlesActions.LoadDifficulty,
  props<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }>(),
);

export const addWords = createAction(ArticlesActions.addWords, props<{ word: Word }>());
export const BackWord = createAction(ArticlesActions.BackWord);
