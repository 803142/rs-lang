import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.expectation;

export const selectExpectation = createSelector(selectFeature, (state: boolean) => state);
