// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>Profile Page</h2>

    <ng-container *ngIf="user as u; else noUser">
      <form (ngSubmit)="save()" style="max-width:460px">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" [(ngModel)]="u.username" name="username" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" [(ngModel)]="u.email" name="email" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Birthdate</label>
          <input type="date" class="form-control" [(ngModel)]="u.birthdate" name="birthdate">
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input type="number" class="form-control" [(ngModel)]="u.age" name="age" min="0">
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary ms-2" (click)="logout()">Logout</button>

        <div class="alert alert-success mt-3" *ngIf="saved">Saved!</div>
      </form>
    </ng-container>

    <ng-template #noUser>
      <p>No user logged in. <a routerLink="/login">Go to Login</a></p>
    </ng-template>
  `
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null;
  saved = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    if (!this.user) this.router.navigate(['/login']);
  }

  save(): void {
  if (!this.user) return;
  // 以用户名为 key 保存用户修改
  localStorage.setItem(`user:${this.user.username}`, JSON.stringify(this.user));

  // 同时刷新当前会话用的数据
  localStorage.setItem('currentUser', JSON.stringify(this.user));

  this.saved = true;
  setTimeout(() => (this.saved = false), 1500);
}


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
