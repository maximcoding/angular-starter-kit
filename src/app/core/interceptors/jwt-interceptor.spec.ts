import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, HttpClient, withInterceptors} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {AuthState} from '../store/auth/auth.state';
import {JWTInterceptor} from './jwt.interceptor';

describe('JWTInterceptor', () => {
  let httpMock: HttpTestingController;
  let storeSpy: jest.Mocked<Store>;

  beforeEach(() => {
    // Create a mock for the NGXS Store with logging to ensure selectSnapshot is called
    storeSpy = {
      selectSnapshot: jest.fn((selector) => {
        if (selector === AuthState.getToken) {
          return 'test-jwt-token';
        }
        return null;
      })
    } as unknown as jest.Mocked<Store>;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([JWTInterceptor])),  // Register JWTInterceptor
        provideHttpClientTesting(),
        {provide: Store, useValue: storeSpy}
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should attach Authorization header if token exists and URL is not excluded', () => {
    storeSpy.selectSnapshot.mockReturnValue('test-jwt-token');  // Mock the token

    // Make a request and confirm the URL and headers
    const httpClient = TestBed.inject(HttpClient);
    httpClient.get('/api/home').subscribe();

    // Expect a request to /api/home and verify headers
    const req = httpMock.expectOne('/api/home');  // Match the exact URL
    expect(req.request.headers.get('Authorization')).toBe(`Bearer test-jwt-token`); // Check Authorization header
    req.flush({});
  });

  it('should not attach Authorization header if URL is excluded', () => {
    storeSpy.selectSnapshot.mockReturnValue('test-jwt-token'); // Mock token

    // Make a request to an excluded URL
    TestBed.inject(HttpClient).get('/auth/login').subscribe();

    const req = httpMock.expectOne('/auth/login');
    expect(req.request.headers.has('Authorization')).toBe(false); // No Authorization header expected
    req.flush({});
  });

  it('should not attach Authorization header if no token is available', () => {
    storeSpy.selectSnapshot.mockReturnValue(null); // Mock no token

    TestBed.inject(HttpClient).get('/api/protected-resource').subscribe();

    const req = httpMock.expectOne('/api/protected-resource');
    expect(req.request.headers.has('Authorization')).toBe(false); // No Authorization header expected
    req.flush({});
  });
});
