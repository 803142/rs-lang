import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../components/buttons/buttons.component';
import { StorageTestComponent } from '../common/services/storage/storage-test.component';
import { AngularMaterialModule } from './material/material.module';

@NgModule({
  declarations: [StorageTestComponent, ButtonsComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [
    AngularMaterialModule,
    StorageTestComponent,
    RouterModule,
    ButtonsComponent,
    CommonModule,
  ],
})
export class SharedModule {}
