// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, AuthUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light mb-3">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a routerLink="/" class="nav-link">Home</a></li>
          <li class="nav-item"><a routerLink="/login" class="nav-link" *ngIf="!currentUser">Login</a></li>
          <li class="nav-item"><a routerLink="/profile" class="nav-link" *ngIf="currentUser">Profile</a></li>
        </ul>

        <div class="d-flex" *ngIf="currentUser as u; else guest">
          <span class="navbar-text me-3">Hi, {{ u.username }}</span>
          <button class="btn btn-outline-secondary btn-sm" (click)="logout()">Logout</button>
        </div>
        <ng-template #guest>
          <span class="navbar-text">Not logged in</span>
        </ng-template>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  get currentUser(): AuthUser | null { return this.auth.getCurrentUser(); }

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
