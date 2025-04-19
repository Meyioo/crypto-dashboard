import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'auth_token';
  private readonly validPassword = 'a';
  private readonly expirationMinutes = 60;
  private readonly router = inject(Router);

  private readonly logoutSubject = new BehaviorSubject<boolean>(false);
  public logout$ = this.logoutSubject.asObservable();

  constructor() {
    this.checkExpiration();
  }

  login(password: string): boolean {
    if (password === this.validPassword) {
      const expires = new Date().getTime() + this.expirationMinutes * 1000;
      localStorage.setItem(this.storageKey, expires.toString());
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    const expiry = localStorage.getItem(this.storageKey);
    if (!expiry) {
      return false;
    }
    return new Date().getTime() < +expiry;
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

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
    this.logoutSubject.next(true);
  }
}
