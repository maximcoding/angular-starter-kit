import {TestBed} from '@angular/core/testing';
import {Store} from '@ngxs/store';
import {AuthState, logoutPlugin} from './auth.state';
import {CheckAuthStatus, Login, Logout} from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs';
import {NgxsModule} from '@ngxs/store';

describe('AuthState', () => {
  let store: Store;
  let authServiceSpy: jest.Mocked<AuthService>;

  beforeEach(() => {

    // Mock only the methods we need and cast as jest.Mocked<AuthService>
    authServiceSpy = {
      login: jest.fn(),
      logout: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])],
      providers: [
        {provide: AuthService, useValue: authServiceSpy}
      ]
    });

    store = TestBed.inject(Store);
  });

  it('should set isAuthenticated to true and store token on successful login', () => {
    const mockToken = 'test-token';
    authServiceSpy.login.mockReturnValue(of(mockToken));

    store.dispatch(new Login({username: 'test', password: 'password'}));

    const authState = store.selectSnapshot(AuthState.isAuthenticated);
    const token = store.selectSnapshot(AuthState.getToken);

    expect(authState).toBe(true);
    expect(token).toBe(mockToken);
  });

  it('should set isAuthenticated to false and clear token on logout', () => {
    store.dispatch(new Logout());

    const authState = store.selectSnapshot(AuthState.isAuthenticated);
    const token = store.selectSnapshot(AuthState.getToken);

    expect(authState).toBe(false);
    expect(token).toBeNull();
  });

  it('should set isAuthenticated based on token presence in checkAuthStatus', () => {
    store.reset({
      auth: {token: 'existing-token', isAuthenticated: false}
    });
    store.dispatch(new CheckAuthStatus());
    const authState = store.selectSnapshot(AuthState.isAuthenticated);
    expect(authState).toBe(true);
  });
});


