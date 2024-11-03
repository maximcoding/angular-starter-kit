import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let apiServiceSpy: jest.Mocked<ApiService>;

  beforeEach(() => {
    // Create a mock for ApiService
    apiServiceSpy = {
      post: jest.fn()
    } as unknown as jest.Mocked<ApiService>;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useValue: apiServiceSpy } // Provide the mocked ApiService
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should call ApiService.post with the correct endpoint and payload for login', () => {
    const mockResponse = { token: 'dummy-token' };
    const username = 'testuser';
    const password = 'password';
    apiServiceSpy.post.mockReturnValue(of(mockResponse));

    authService.login(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/login', { username, password });
  });

  it('should call ApiService.post with the correct endpoint and empty payload for logout', () => {
    const mockResponse = { success: true };
    apiServiceSpy.post.mockReturnValue(of(mockResponse));

    authService.logout().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('auth/logout', {});
  });
});
