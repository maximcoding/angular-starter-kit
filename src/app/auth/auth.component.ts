import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Login, Logout} from '../core/store/auth/auth.actions';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {AuthState} from '../core/store/auth/auth.state';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<{ username: string } | null>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  }

  login() {
    this.store.dispatch(new Login({username: 'testuser', password: 'password'}));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
