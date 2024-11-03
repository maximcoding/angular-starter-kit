// src/app/app.component.spec.ts

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgxsModule, Store} from '@ngxs/store';
import {RouterOutlet} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {provideHttpClient} from '@angular/common/http';
import {ngxsStates} from './core/store/store.config';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        AuthComponent,
        NgxsModule.forRoot(ngxsStates, {developmentMode: true}),
      ],
      providers: [
        provideHttpClient(),
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue(of(true)), // Mock select to return true for isAuthenticated
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "angular-starter-kit"', () => {
    expect(component.title).toBe('angular-starter-kit');
  });

  it('should render RouterOutlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy(); // Check that RouterOutlet is present in the template
  });
});
