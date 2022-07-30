import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { StatsService } from 'src/app/common/services/stats.service';
import { SettingsService } from 'src/app/common/services/settings.service';
import { SessionService } from 'src/app/common/services/storage/session.service';
import { Store } from '@ngrx/store';
import { AlertBarService } from '../../common/services/alert-bar.service';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../common/services/auth.service';
import { saveSettings } from '../actions/settings.actions';
import { saveStatistics } from '../actions/stats.actions';
import { initialState as initialStateSetting } from '../reducers/settings.reducer';
import { initialState as initialStateStats } from '../reducers/stats.reducer';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ user, reg }) =>
        this.authService.loginUser(user, reg).pipe(
          map((res) =>
            authActions.loginSuccess({
              user: {
                userId: res.user.userId,
                name: res.user.name,
                token: res.user.token,
                photo: res.user.photo,
              },
              start: false,
              reg: res.reg,
            }),
          ),
          catchError((error) => of(authActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  loginToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap((action) => {
          this.sessionService.setItem('user', action.user);
          if (!action.start) {
            this.router.navigateByUrl('/');
          }
          if (action.reg) {
            this.store.dispatch(
              saveSettings({
                payload: initialStateSetting,
              }),
            );
            this.store.dispatch(
              saveStatistics({
                ...initialStateStats,
              }),
            );
          } else {
            this.settingsService.getSettingsFromServer(!action.reg);
          }
        }),
      ),
    { dispatch: false },
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUp),
      switchMap(({ user }) =>
        this.authService.registerUser(user).pipe(
          map(() => {
            return authActions.signUpSuccess({
              user: { email: user.get('email'), password: user.get('password') },
              reg: true,
            });
          }),
          catchError((error) => of(authActions.signUpFailure({ error }))),
        ),
      ),
    ),
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpSuccess),
      map((user) => authActions.login(user)),
    ),
  );

  signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signUpFailure),
        tap(() =>
          this.alertBarService.notification$.next('Пользователь с такой почтой уже существует'),
        ),
      ),
    { dispatch: false },
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure),
        tap(() => this.alertBarService.notification$.next('Неправильная почта или пароль')),
      ),
    { dispatch: false },
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.sessionService.removeItem('user');
          this.settingsService.resetSettings();
          this.statsService.resetStatistics();
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  isAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.isAuth),
        tap(() => this.authService.isAuth()),
      ),
    { dispatch: false },
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private settingsService: SettingsService,
    private statsService: StatsService,
    private alertBarService: AlertBarService,
  ) {}
}
