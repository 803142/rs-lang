import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGameListComponent } from './components/my-game-list/my-game-list.component';
import { MyGameStartComponent } from './components/my-game-start/my-game-start.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyGameStartComponent,
      },
      {
        path: 'my-game-start',
        component: MyGameListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyGameRoutingModule {}
