import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;

  constructor() {}

  login(credentials: { email: string; password: string }) {
    if (!credentials.email || !credentials.password) {
      console.error('Invalid credentials');
      return;
    }

    const envEmail = import.meta.env.NG_APP_LOGIN_EMAIL;
    const envPassword = import.meta.env.NG_APP_LOGIN_PASSWORD;

    if (
      credentials.email !== envEmail ||
      credentials.password !== envPassword
    ) {
      console.error('Authentication failed: Invalid email or password');
      return;
    }

    this.isAuthenticated = true;
  }

  logout() {}
}
