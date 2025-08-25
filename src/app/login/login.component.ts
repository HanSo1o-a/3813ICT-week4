import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onSubmit()" style="max-width:400px">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" class="form-control" [(ngModel)]="username" name="username" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div class="alert alert-danger mt-2" *ngIf="error">{{ error }}</div>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: user => {
        if (user.valid) {
          this.router.navigate(['/profile']);
        } else {
          this.error = 'Username or password is wrong.';
        }
      },
      error: () => this.error = 'server connection failed.'
    });
  }
}
