import { createAction, props } from '@ngrx/store';
import { IDay, IDailyStats } from '../../common/models/stats.model';
import { StatisticsActionsType } from '../models/stats.model';

export const setStatistics = createAction(
  StatisticsActionsType.SetStats,
  props<{ shortTerm: IDailyStats; longTerm: Array<IDay> }>(),
);
export const saveStatistics = createAction(
  StatisticsActionsType.SaveStats,
  props<{ shortTerm: IDailyStats; longTerm: Array<IDay> }>(),
);
export const getStatistics = createAction(StatisticsActionsType.GetStats);
export const resetStatistics = createAction(StatisticsActionsType.ResetStats);
