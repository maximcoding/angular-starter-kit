import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {Store} from '@ngxs/store';
import {map, tap} from 'rxjs/operators';
import {AuthState} from '../core/store/auth/auth.state';
import {NavigationService} from '../core/services/navigation.service';

export const authGuard: CanActivateFn = (route, state) => {

  const store = inject(Store);

  const navigationService = inject(NavigationService);

  return store.select(AuthState.isAuthenticated).pipe(
    map(isAuthenticated => isAuthenticated),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        navigationService.goToLogin();
      }
    })
  );
};
