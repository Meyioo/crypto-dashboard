import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'auth_token';
  private readonly validEmail = import.meta.env.NG_APP_LOGIN_EMAIL;
  private readonly validPassword = import.meta.env.NG_APP_LOGIN_PASSWORD;
  private readonly expirationMinutes = 60;
  private readonly router = inject(Router);

  private readonly logoutSubject = new BehaviorSubject<boolean>(false);
  public logout$ = this.logoutSubject.asObservable();

  constructor() {
    this.checkExpiration();
  }

  public login(email: string, password: string): boolean {
    if (email === this.validEmail && password === this.validPassword) {
      const expires = new Date().getTime() + this.expirationMinutes * 20000;
      localStorage.setItem(this.storageKey, expires.toString());
      return true;
    }
    return false;
  }

  public isLoggedIn(): boolean {
    const expiry = localStorage.getItem(this.storageKey);
    if (!expiry) {
      return false;
    }
    return new Date().getTime() < +expiry;
  }

  public logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
    this.logoutSubject.next(false);
  }

  private checkExpiration(): void {
    const expiry = localStorage.getItem(this.storageKey);
    if (expiry) {
      this.scheduleAutoLogout(+expiry);
    }
  }

  private scheduleAutoLogout(expiry: number): void {
    const now = new Date().getTime();
    const timeout = expiry - now;
    if (timeout > 0) {
      setTimeout(() => this.logout(), timeout);
    } else {
      this.logout();
    }
  }
}
