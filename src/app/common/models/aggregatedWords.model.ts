import { Word } from './word.model';

export interface AggregatedWords {
  paginatedResults: Word[];
  totalCount: [{ count: number }];
}

export interface AggregatedWordsRedux {
  paginatedResults: Word[];
  totalCount: [{ 0: number; 1: number; 2: number; 3: number; 4: number; 5: number }];
}

export interface ICurrentWords {
  paginatedResults: Word[];
  totalCount: number;
  errorMessage?: string;
}
