import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NavigationService } from '../core/services/navigation.service';
import { authGuard } from './auth.guard';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

describe('authGuard', () => {
  let storeSpy: jest.Mocked<Store>;
  let navigationServiceSpy: jest.Mocked<NavigationService>;
  let injector: EnvironmentInjector;

  // Mock instances for ActivatedRouteSnapshot and RouterStateSnapshot
  const mockRouteSnapshot = {} as ActivatedRouteSnapshot;
  const mockRouterStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Mock the NGXS Store
    storeSpy = {
      select: jest.fn() // Mock the select method to return observables
    } as unknown as jest.Mocked<Store>;

    // Mock the NavigationService
    navigationServiceSpy = {
      goToLogin: jest.fn() // Mock goToLogin method for redirection
    } as unknown as jest.Mocked<NavigationService>;

    // Configure TestBed with providers and retrieve EnvironmentInjector
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
      ]
    });

    injector = TestBed.inject(EnvironmentInjector); // Get EnvironmentInjector for DI context
  });

  it('should allow navigation if the user is authenticated', (done) => {
    storeSpy.select.mockReturnValue(of(true)); // Mock isAuthenticated to true

    // Run authGuard in the DI context
    runInInjectionContext(injector, () => {
      (authGuard(mockRouteSnapshot, mockRouterStateSnapshot) as Observable<boolean>).subscribe((canActivate) => {
        expect(canActivate).toBe(true); // Expect navigation to be allowed
        expect(navigationServiceSpy.goToLogin).not.toHaveBeenCalled(); // No redirection expected
        done();
      });
    });
  });

  it('should redirect to login if the user is not authenticated', (done) => {
    storeSpy.select.mockReturnValue(of(false)); // Mock isAuthenticated to false

    // Run authGuard in the DI context
    runInInjectionContext(injector, () => {
      (authGuard(mockRouteSnapshot, mockRouterStateSnapshot) as Observable<boolean>).subscribe((canActivate) => {
        expect(canActivate).toBe(false); // Expect navigation to be denied
        expect(navigationServiceSpy.goToLogin).toHaveBeenCalled(); // Redirection expected
        done();
      });
    });
  });
});
