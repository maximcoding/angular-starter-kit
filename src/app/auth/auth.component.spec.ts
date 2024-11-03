import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { Store } from '@ngxs/store';
import { Login, Logout } from '../core/store/auth/auth.actions';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let storeSpy: jest.Mocked<Store>;

  beforeEach(async () => {
    // Create a Jest mock of the NGXS Store
    storeSpy = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of(false)), // Mock isAuthenticated$ to return false by default
      selectSnapshot: jest.fn()
    } as unknown as jest.Mocked<Store>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, AuthComponent],
      providers: [{ provide: Store, useValue: storeSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Login action with correct payload on login()', () => {
    component.login();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new Login({ username: 'testuser', password: 'password' }));
  });

  it('should dispatch Logout action on logout()', () => {
    component.logout();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new Logout());
  });

  it('should have an observable isAuthenticated$', () => {
    storeSpy.select.mockReturnValue(of(true)); // Mock isAuthenticated$ to return true
    fixture.detectChanges();
    component.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBe(true);
    });
  });
});
