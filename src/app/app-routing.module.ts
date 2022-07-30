import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/navigation/registration/registration.component';
import { Path } from './shared/models/router.model';
import { LoginGuard } from './common/guards/login.guard';
import { AboutUsListComponent } from './components/aboutUs/components/about-us-list/about-us-list.component';
import { StartPageComponent } from './components/start-page/start-page/start-page.component';

const appRoutes: Routes = [
  { path: Path.Empty, redirectTo: Path.Empty, pathMatch: 'full', component: StartPageComponent },
  { path: Path.AboutUs, component: AboutUsListComponent },
  {
    path: Path.Cards,
    loadChildren: () => import('./components/cards/cards.module').then((m) => m.CardsModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  {
    path: Path.Profile,
    loadChildren: () => import('./components/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  {
    path: Path.Games,
    loadChildren: () => import('./components/games/games.module').then((m) => m.GamesModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  { path: Path.Registration, component: RegistrationComponent },
  {
    path: Path.Dictionary,
    loadChildren: () =>
      import('./components/dictionary/dictionary.module').then((m) => m.DictionaryModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
