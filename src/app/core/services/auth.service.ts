
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginEndpoint = 'auth/login';
  private readonly logoutEndpoint = 'auth/logout';

  constructor(private apiService: ApiService) {}

  // Make an API call to log in
  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.apiService.post(this.loginEndpoint, payload);
  }

  // Make an API call to log out
  logout(): Observable<any> {
    return this.apiService.post(this.logoutEndpoint, {});
  }
}
