import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [StartPageComponent, LoginComponent],
  imports: [CommonModule, SharedModule],
})
export class StartPageModule {}
