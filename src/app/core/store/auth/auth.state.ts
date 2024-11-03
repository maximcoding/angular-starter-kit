import {Injectable} from '@angular/core';
import {Action, getActionTypeFromInstance, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthStateModel, User} from './auth.model';
import {CheckAuthStatus, Login, Logout} from './auth.actions';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

export function logoutPlugin(state: any, action: any, next: any) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
    // if we are a logout type, lets erase all the state
    state = {};
  }
  // return the next function with the empty state
  return next(state, action);
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    isAuthenticated: false
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService,
              private store: Store) {
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const {username, password} = action.payload;
    return this.authService.login(username, password).pipe(
      tap((response) => {
        ctx.patchState({
          token: response,
          isAuthenticated: true
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      token: null,
      isAuthenticated: false
    });
  }

  @Action(CheckAuthStatus)
  checkAuthStatus(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    if (state.token) {
      ctx.patchState({isAuthenticated: true});
    } else {
      ctx.patchState({isAuthenticated: false});
    }
  }
}
