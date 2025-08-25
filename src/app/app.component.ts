import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light mb-3">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item"><a routerLink="/" class="nav-link">Home</a></li>
          <li class="nav-item"><a routerLink="/login" class="nav-link">Login</a></li>
          <li class="nav-item"><a routerLink="/profile" class="nav-link">Profile</a></li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}