import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILoginState } from '../models/loginState.models';
import { authFeatureKey } from '../reducers/auth.reducers';

export const selectLogin = createFeatureSelector(authFeatureKey);
export const isLoginSelector = createSelector(
  selectLogin,
  (state: ILoginState) => state.isAuthenticated,
);
export const userSelector = createSelector(selectLogin, (state: ILoginState) => state.user);
