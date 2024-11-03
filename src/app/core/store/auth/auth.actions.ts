import {LoginPayload} from './auth.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginPayload) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class CheckAuthStatus {
  static readonly type = '[Auth] Check Status';
}
