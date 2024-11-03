import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideStore} from '@ngxs/store';
import { NGXS_PLUGINS } from '@ngxs/store/plugins';

import {ngxsStates, ngxsConfig, ngxsPlugins} from './core/store/store.config';
import {JWTInterceptor} from './core/interceptors/jwt.interceptor';
import {logoutPlugin} from './core/store/auth/auth.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([JWTInterceptor])),
    provideStore(ngxsStates, ngxsConfig, ...ngxsPlugins),
    {
      provide: NGXS_PLUGINS,
      useValue: logoutPlugin,
      multi: true
    }
  ]
};
