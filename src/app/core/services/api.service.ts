import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { params })
      .pipe(catchError(this.handleError));
  }

  // POST request
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // PUT request
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // DELETE request
  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // PATCH request
  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error); // Log to console or a logging service
    return throwError(() => new Error('An error occurred while processing the request.'));
  }
}
