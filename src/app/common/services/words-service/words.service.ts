import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AddDifficultyWords, addWords } from 'src/app/redux/actions/words.actions';
import { filter } from '../../../shared/constants/http-constans';
import { AggregatedWords } from '../../models/aggregatedWords.model';
import { DifficultyWord, AggregatedWordsToGet, StatWord } from '../../models/requests.model';
import { Word } from '../../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient, private store: Store) {}

  getWords(): Observable<Word[]> {
    return this.http
      .get<Word[]>(`${URL_BACK_SERVER.URL_BACK}words?group=5&page=10`)
      .pipe(map((words) => words));
  }

  aggregatedWords({
    group,
    page,
    userId,
    wordsPerPage,
  }: AggregatedWordsToGet): Observable<AggregatedWords[]> {
    return this.http
      .get<AggregatedWords[]>(
        `${URL_BACK_SERVER.URL_BACK}users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter={"$or":[${filter.easy},${filter.hard},${filter.noUserWords}]}`,
      )
      .pipe(map((words) => words));
  }

  aggregatedGameList({
    group,
    page,
    userId,
    wordsPerPage,
  }: AggregatedWordsToGet): Observable<AggregatedWords[]> {
    return this.http
      .get<AggregatedWords[]>(
        `${URL_BACK_SERVER.URL_BACK}users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter={"$or":[${filter.easy},${filter.hard}]}`,
      )
      .pipe(map((words) => words));
  }

  aggregatedGameListNew({
    group,
    page,
    userId,
    wordsPerPage,
  }: AggregatedWordsToGet): Observable<AggregatedWords[]> {
    return this.http
      .get<AggregatedWords[]>(
        `${URL_BACK_SERVER.URL_BACK}users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter.noUserWords}`,
      )
      .pipe(map((words) => words));
  }

  addDifficultyWord({
    wordId,
    userId,
    difficulty = 'easy',
    newWord = true,
  }: DifficultyWord): Observable<{
    wordId: string;
    difficulty: 'easy' | 'hard' | 'deleted';
    newWord: boolean;
  }> {
    if (newWord) {
      return this.http
        .post(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${wordId}`, {
          difficulty,
          optional: { repeat: 0, failCount: 0 },
        })
        .pipe(map(() => ({ wordId, difficulty, newWord })));
    }
    return this.http
      .put(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${wordId}`, {
        difficulty,
      })
      .pipe(map(() => ({ wordId, difficulty, newWord })));
  }

  addStatWord({ word, userId, error }: StatWord) {
    if (!word.userWord) {
      return this.http
        .post(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${word._id}`, {
          difficulty: 'easy',
          optional: { repeat: 1, failCount: error ? 1 : 0 },
        })
        .pipe(map(() => ({ id: word._id, err: error, newWord: !word.userWord })));
    }
    return this.http
      .put(`${URL_BACK_SERVER.URL_BACK}users/${userId}/words/${word._id}`, {
        optional: {
          repeat: word.userWord.optional.repeat + 1,
          failCount: error
            ? word.userWord.optional.failCount + 1
            : word.userWord.optional.failCount,
        },
      })
      .pipe(map(() => ({ id: word._id, err: error, newWord: !word.userWord })));
  }

  addWordToResult(word, user, paginatedResults) {
    const wordId = word._id;
    const difficulty = 'easy';
    const currentWord = paginatedResults.filter((item) => item._id === wordId);
    if (currentWord.length !== 0) {
      this.store.dispatch(AddDifficultyWords({ wordId, difficulty, newWord: false }));
    } else {
      this.store.dispatch(addWords({ word }));
    }
  }
}
