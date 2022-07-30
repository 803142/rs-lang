import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, RegistrationComponent],
  exports: [NavBarComponent],
  imports: [CommonModule, LayoutModule, SharedModule, AppRoutingModule],
})
export class NavigationModule {}
