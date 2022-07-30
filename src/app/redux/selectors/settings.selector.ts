import { createSelector } from '@ngrx/store';
import { ISettings } from 'src/app/common/models/settings.model';
import { AppState } from '../app.state';

export const selectSettings = (state: AppState) => ({ ...state.settings });

export const selectSetGames = createSelector(selectSettings, (state: ISettings) => state);
