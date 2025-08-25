import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onSubmit()" style="max-width:400px">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
      </div>
      <!-- 注意 type="submit" -->
      <button type="submit" class="btn btn-primary">Login</button>

      <!-- 错误提示 -->
      <p class="text-danger mt-2" *ngIf="error">{{ error }}</p>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  users = [
    { email: 'alice@example.com', password: 'alice123' },
    { email: 'bob@example.com', password: 'bob123' },
    { email: 'charlie@example.com', password: 'charlie123' }
  ];

  onSubmit() {
    const ok = this.users.some(
      u => u.email === this.email && u.password === this.password
    );
    if (ok) {
      this.error = '';
      this.router.navigate(['/profile']);
    } else {
      // 设置错误信息 → Angular 会自动刷新页面显示
      this.error = 'Email or Password is wrong.';
    }
  }
}


