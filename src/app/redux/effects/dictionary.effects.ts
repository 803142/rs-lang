import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ICurrentWords } from '../../common/models/aggregatedWords.model';
import { DictionaryService } from '../../common/services/dictionary.service';

import { SessionService } from '../../common/services/storage/session.service';
import { syncWords } from '../actions/dictionary.actions';
import * as dictionaryActions from '../actions/dictionary.actions';
import { IUser } from '../models/user.models';
import { userSelector } from '../selectors/auth.selectors';

@Injectable()
export class DictionaryEffects {
  updateWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dictionaryActions.updateWords, dictionaryActions.restoreWordSuccess),
      concatLatestFrom(() => this.store.select(userSelector)),
      switchMap(([, userData]) =>
        this.dictionaryService.getWords(userData).pipe(
          map((res: ICurrentWords) =>
            dictionaryActions.updateWordsSuccess({
              paginatedResults: res.paginatedResults,
              totalCount: res.totalCount,
              errorMessage: res.errorMessage,
            }),
          ),
          catchError((error) => of(dictionaryActions.updateWordsFailure({ error }))),
        ),
      ),
    ),
  );

  restoreWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dictionaryActions.restoreWord),
      concatLatestFrom(() => this.store.select(userSelector)),
      tap(([actionWord, user]: [actionWord: any, user: any]) =>
        this.store.dispatch(syncWords({ word: actionWord.word, user })),
      ),
      switchMap(([action, userData]: [action: any, userData: IUser]) =>
        this.dictionaryService.restoreWord(action.word, userData).pipe(
          map((word) => dictionaryActions.restoreWordSuccess({ word })),
          catchError((error) => of(dictionaryActions.updateWordsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dictionaryService: DictionaryService,
    private router: Router,
    private sessionService: SessionService,
    private store: Store,
  ) {}
}
