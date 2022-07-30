import { createAction, props } from '@ngrx/store';
import { ActionType } from '../models/authAction.models';
import { IHttpUser, IUser } from '../models/user.models';

export const login = createAction(ActionType.LogIn, props<{ user: IHttpUser; reg: boolean }>());
export const loginSuccess = createAction(
  ActionType.LogInSuccess,
  props<{ user: IUser; start: boolean; reg: boolean }>(),
);
export const loginFailure = createAction(ActionType.LogInFailure, props<any>());
export const signUp = createAction(ActionType.SignUp, props<{ user: FormData }>());
export const signUpSuccess = createAction(
  ActionType.SignUpSuccess,
  props<{ user: IHttpUser; reg: boolean }>(),
);
export const signUpFailure = createAction(ActionType.SignUpFailure, props<any>());
export const logout = createAction(ActionType.LogOut);
export const isAuth = createAction(ActionType.isAuth);
