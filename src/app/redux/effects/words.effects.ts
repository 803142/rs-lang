import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { WordsService } from 'src/app/common/services/words-service/words.service';
import { syncWords } from '../actions/dictionary.actions';

import {
  AddDifficultyWords,
  AddStatWords,
  ArticlesActions,
  LoadDifficultyWords,
  LoadStatWords,
  LoadWords,
  retrievedWordsList,
} from '../actions/words.actions';

import { selectWordsByGroup, selectWords } from '../selectors/words.selector';

@Injectable()
export class WordsEffects {
  bool = false;

  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private userSession: SessionService,
    private store: Store,
  ) {}

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadWords),
      tap(({ group, page, wordsPerPage }) => {
        this.store.select(selectWordsByGroup(group)).subscribe((store) => {
          this.bool =
            store[0].paginatedResults.filter((el) => el.group === group).length >=
            (page + 1) * wordsPerPage;
        });
      }),
      mergeMap(({ group, page, wordsPerPage }) => {
        if (this.bool) return of({ type: ArticlesActions.BackWord });
        return of(this.userSession.getItem('user')).pipe(
          mergeMap(({ userId }) => {
            return this.wordsService.aggregatedWords({ group, page, userId, wordsPerPage }).pipe(
              map((word) => {
                return retrievedWordsList({ Words: word });
              }),
            );
          }),
        );
      }),
    );
  });

  addStatWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadStatWords),
      mergeMap(({ word, error }) => {
        const { userId } = this.userSession.getItem('user');
        return this.wordsService
          .addStatWord({ word, userId, error })
          .pipe(map(() => AddStatWords({ wordId: word._id, error })));
      }),
    );
  });

  addDifficultyWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadDifficultyWords),
      mergeMap(({ wordId, difficulty, newWord }) => {
        return of(this.userSession.getItem('user')).pipe(
          mergeMap(({ userId }) => {
            return this.wordsService
              .addDifficultyWord({ wordId, userId, difficulty, newWord })
              .pipe(map(() => AddDifficultyWords({ wordId, difficulty, newWord })));
          }),
        );
      }),
    );
  });

  syncWords$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(syncWords),
        concatLatestFrom(() => this.store.select(selectWords)),
        tap(([{ word, user }, [{ paginatedResults }]]) =>
          this.wordsService.addWordToResult(word, user, paginatedResults),
        ),
      );
    },
    { dispatch: false },
  );
}
