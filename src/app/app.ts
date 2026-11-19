import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FloatingActions } from './components/floating-actions/floating-actions';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, FloatingActions],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);

  isAdminRoute = signal(this.router.url.startsWith('/admin'));

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
        }
      });
  }
}
