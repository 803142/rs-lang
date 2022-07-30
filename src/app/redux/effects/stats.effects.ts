import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { IStats } from 'src/app/common/models/stats.model';
import { StatisticsActionsType } from '../models/stats.model';
import { StatsService } from '../../common/services/stats.service';
import * as statisticsActions from '../actions/stats.actions';

@Injectable()
export class StatisticsEffects {
  saveStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActionsType.SaveStats),
      mergeMap((payload) =>
        this.statsService
          .saveStatistics(payload)
          .pipe(map((response: IStats) => statisticsActions.setStatistics(response))),
      ),
    ),
  );

  getStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActionsType.GetStats),
      mergeMap(() =>
        this.statsService
          .getStatistics()
          .pipe(map((response: IStats) => statisticsActions.setStatistics(response))),
      ),
    ),
  );

  constructor(private actions$: Actions, private statsService: StatsService) {}
}
