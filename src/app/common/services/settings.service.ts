import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { getSettings, resetSettings } from 'src/app/redux/actions/settings.actions';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { AppState } from 'src/app/redux/app.state';
import { ISettings } from '../models/settings.model';
import { SessionService } from './storage/session.service';
import { LocalStorageService } from './storage/local.service';

const { URL_BACK } = URL_BACK_SERVER;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  userId: string;

  bool: boolean;

  constructor(
    private http: HttpClient,
    private userSession: SessionService,
    private store: Store<AppState>,
    private localService: LocalStorageService,
  ) {}

  getSettings(): Observable<ISettings> {
    const set = this.getSetLocal();
    if (set) {
      return of(set);
    }
    return this.http
      .get<ISettings>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/settings`)
      .pipe(
        map((settings) => {
          if (this.bool) {
            this.setSetLocal(settings);
          }
          return settings;
        }),
      );
  }

  saveSettings(data: ISettings): Observable<ISettings> {
    this.setSetLocal(data);
    return this.http
      .put<ISettings>(`${URL_BACK}users/${this.userSession.getItem('user').userId}/settings`, data)
      .pipe(map((settings) => settings));
  }

  getSettingsFromServer(bool: boolean) {
    this.bool = bool;
    this.store.dispatch(getSettings());
  }

  resetSettings() {
    this.localService.removeItem('set');
    this.store.dispatch(resetSettings());
  }

  getSetLocal(): ISettings | false {
    return JSON.parse(this.localService.getItem('set')) || false;
  }

  setSetLocal(set: ISettings) {
    return this.localService.setItem('set', JSON.stringify(set));
  }
}
