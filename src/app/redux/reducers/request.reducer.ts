import { createReducer, on } from '@ngrx/store';
import { expectationRequest } from '../actions/request.actions';

export const expectationFeatureKey = 'expectation';

export const initialState: Readonly<boolean> = true;

export const expectationReducer = createReducer(
  initialState,
  on(expectationRequest, (state, { expectation }) => {
    return expectation;
  }),
);
