import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DictionaryComponent } from './dictionary/dictionary.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DictionaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DictionaryRoutingModule {}
