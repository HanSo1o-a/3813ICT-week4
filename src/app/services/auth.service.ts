import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  valid: boolean;
  username: string;
  birthdate: string;
  age: number;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'currentUser';
  private readonly BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthUser> {
  return this.http.post<AuthUser>(`${this.BASE_URL}/auth`, { username, password })
    .pipe(
      tap(user => {
        if (user.valid) {
          // 读取本地覆盖
          const raw = localStorage.getItem(`user:${user.username}`);
          if (raw) {
            const override = JSON.parse(raw) as Partial<AuthUser>;

            // 合并：以本地覆盖为准
            user = { ...user, ...override, valid: true };

            // 可选：类型修正，防止 age 变成字符串
            (user as any).age = Number((user as any).age);
          }

          // 存入当前会话
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
}

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) as AuthUser : null;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }
}
