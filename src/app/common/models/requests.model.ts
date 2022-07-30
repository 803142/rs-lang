import { Word } from './word.model';

export type AggregatedWordsToGet = {
  group: number;
  page: number;
  userId: string;
  wordsPerPage: number;
};

export type DifficultyWord = {
  wordId: string;
  userId: string;
  difficulty: 'easy' | 'hard' | 'deleted';
  newWord: boolean;
};

export type StatWord = {
  word: Word;
  userId: string;
  error?: boolean;
};
