import {TestBed} from '@angular/core/testing';
import {provideHttpClient, HttpHeaders} from '@angular/common/http';
import {provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';
import {ApiService} from './api.service';
import {environment} from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  // Mock console.error
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn(); // Mock console.error to suppress error logs
  });

  afterAll(() => {
    console.error = originalConsoleError; // Restore console.error after tests
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),           // Provide HttpClient
        provideHttpClientTesting(),     // Provide HttpTestingController for testing
      ],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should send a PATCH request with the correct URL and body', () => {
    const mockResponse = {success: true};
    const endpoint = 'test-endpoint';
    const body = {key: 'value'};
    const headers = new HttpHeaders({'Custom-Header': 'CustomValue'});

    service.patch(endpoint, body, headers).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${endpoint}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    expect(req.request.headers.get('Custom-Header')).toBe('CustomValue');
    req.flush(mockResponse); // Provide mock response data
  });

  it('should handle error for PATCH request', () => {
    const endpoint = 'test-endpoint';
    const body = {key: 'value'};
    const errorMessage = 'An error occurred while processing the request.';

    service.patch(endpoint, body).subscribe(
      () => fail('expected an error'),
      (error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${baseUrl}/${endpoint}`);
    req.flush('Error', {status: 500, statusText: 'Server Error'}); // Simulate server error
  });
});
