import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {AuthState} from '../store/auth/auth.state';

export const JWTInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  const excludedUrls = ['/auth/login', '/auth/register'];
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Skip token attachment for excluded URLs
  }
  const token = store.selectSnapshot(AuthState.getToken);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
