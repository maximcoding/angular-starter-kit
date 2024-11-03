import {getActionTypeFromInstance, NgxsModuleOptions, NoopNgxsExecutionStrategy} from '@ngxs/store';
import {NgxsDevtoolsOptions, withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginOptions, withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {environment} from '../../../environments/environment';

import {AuthState, logoutPlugin} from './auth/auth.state';
import {DashboardStates} from './index';
import {withNgxsFormPlugin} from '@ngxs/form-plugin';
import {withNgxsRouterPlugin} from '@ngxs/router-plugin';
import {withNgxsStoragePlugin} from '@ngxs/storage-plugin';
import {withNgxsWebSocketPlugin} from '@ngxs/websocket-plugin';
import {Logout} from './auth/auth.actions';

const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  /**
   * Whether the dev tools is enabled or note. Useful for setting during production.
   */
  disabled: environment.production
};
const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  /**
   * Disable the logger. Useful for prod mode..
   */
  disabled: environment.production
};

export const ngxsPlugins = [
  withNgxsReduxDevtoolsPlugin(DEVTOOLS_REDUX_CONFIG),
  withNgxsFormPlugin(),
  withNgxsLoggerPlugin(LOGGER_CONFIG),
  withNgxsRouterPlugin(),
  withNgxsStoragePlugin({keys: '*'}),
  withNgxsWebSocketPlugin()]

export const ngxsConfig: NgxsModuleOptions = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   */
  developmentMode: !environment.production,
  compatibility: {
    strictContentSecurityPolicy: true
  },
  selectorOptions: {
    suppressErrors: false
  },
  executionStrategy: NoopNgxsExecutionStrategy
};

export const ngxsStates = [AuthState, ...DashboardStates];



