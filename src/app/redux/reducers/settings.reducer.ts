import { createReducer, on } from '@ngrx/store';
import { setSettings, resetSettings } from '../actions/settings.actions';
import { ISettings } from '../../common/models/settings.model';

export const settingsFeatureKey = 'settings';

export const initialState: ISettings = {
  wordsPerDay: 10,
  optional: {
    displayTranslation: true,
    displayHandlingButtons: true,
    setGame: {
      groupAmount: 10,
      groupLevel: 1,
      hideRequired: false,
    },
  },
};

export const settingsReducer = createReducer(
  initialState,
  on(setSettings, (state, { response }) => ({ ...response })),
  on(resetSettings, () => initialState),
);
