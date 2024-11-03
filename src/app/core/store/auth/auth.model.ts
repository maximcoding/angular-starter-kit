export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface LoginPayload extends Partial<User> {
  username: string;
  password: string;
}

export interface AuthStateModel {
  token: null;
  isAuthenticated: boolean;
}

