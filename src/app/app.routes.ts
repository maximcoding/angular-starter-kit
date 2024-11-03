import {Routes} from '@angular/router';
import {authGuard} from './auth/auth.guard';
import {AuthComponent} from './auth/auth.component';

export const AppPaths = {
  home: 'home',
  auth: 'auth',
  profile: 'profile',
};

export const routes: Routes = [{
  path: AppPaths.home,
  loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  canActivate: [authGuard]
}, {
  path: AppPaths.auth,
  component: AuthComponent
}, {
  path: '',
  redirectTo: `/${AppPaths.home}`,
  pathMatch: 'full'
}];
