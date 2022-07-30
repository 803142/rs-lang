import { createAction, props } from '@ngrx/store';

export const expectationRequest = createAction(
  '[successful request] request Success',
  props<{ expectation: boolean }>(),
);
