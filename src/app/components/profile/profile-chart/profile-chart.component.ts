import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { IDay } from 'src/app/common/models/stats.model';
import { graphType } from 'src/app/shared/constants/stats-constants';

@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileChartComponent implements OnChanges {
  @Input() checkedStyle: string;

  @Input() longData: IDay[];

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';

  barChartLegend = false;

  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    },
  ];

  ngOnChanges() {
    this.barChartLabels = [];
    this.longData.forEach((el) => {
      this.barChartLabels.push(formatDate(el.date, 'mediumDate', 'en-US'));
    });

    this.barChartData[0].data = [];
    if (this.checkedStyle === graphType.daily) {
      this.longData.forEach((el) => {
        this.barChartData[0].data.push(el.learned);
      });
    }

    if (this.checkedStyle === graphType.total) {
      this.longData.reduce((acc, el) => {
        this.barChartData[0].data.push(el.learned + acc);
        return acc + el.learned;
      }, 0);
    }
  }
}
