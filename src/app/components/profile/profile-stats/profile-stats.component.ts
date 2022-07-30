import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/redux/app.state';
import { selectShortStats, selectLongStats } from 'src/app/redux/selectors/stats.selector';
import { IDailyStats, IDay } from 'src/app/common/models/stats.model';
import { graphType } from 'src/app/shared/constants/stats-constants';
import { StatsService } from 'src/app/common/services/stats.service';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
})
export class ProfileStatsComponent {
  shortStats: Observable<IDailyStats>;

  longStats: Observable<IDay[]>;

  checkedStyle: string;

  daily = graphType.daily;

  total = graphType.total;

  constructor(private store: Store<AppState>, private statsService: StatsService) {
    this.statsService.getStatisticsFromServer();
    this.shortStats = this.store.select(selectShortStats);
    this.longStats = this.store.select(selectLongStats);
    this.checkedStyle = this.daily;
  }
}
