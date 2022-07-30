import { AppState } from '../app.state';

export const selectStats = (state: AppState) => state.stats;
export const selectShortStats = (state: AppState) => state.stats.shortTerm;
export const selectLongStats = (state: AppState) => state.stats.longTerm;
