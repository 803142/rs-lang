import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileChartComponent } from './profile-chart/profile-chart.component';
import { ProfileShortComponent } from './profile-short/profile-short.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileStatsComponent,
    ProfileSettingsComponent,
    ProfileChartComponent,
    ProfileShortComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
