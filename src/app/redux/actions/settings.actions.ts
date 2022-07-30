import { createAction, props } from '@ngrx/store';
import { SettingsActionsType } from '../models/settings.model';
import { ISettings } from '../../common/models/settings.model';

export const saveSettings = createAction(
  SettingsActionsType.SaveSettings,
  props<{ payload: ISettings }>(),
);

export const setSettings = createAction(
  SettingsActionsType.SetSettings,
  props<{ response: ISettings }>(),
);

export const getSettings = createAction(SettingsActionsType.GetSettings);
export const resetSettings = createAction(SettingsActionsType.ResetSettings);
