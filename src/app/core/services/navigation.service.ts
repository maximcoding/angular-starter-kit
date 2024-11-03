
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppPaths} from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private location: Location) {
  }

  goHome(): Promise<boolean> {
    return this.router.navigate([AppPaths.home]);
  }

  goToLogin(): Promise<boolean> {
    return this.router.navigate([AppPaths.auth]);
  }

  goToRoute(route: string, params?: any): Promise<boolean> {
    return this.router.navigate([route], {queryParams: params});
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }
}
