import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'crypto-dashboard';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.authService.logout$.subscribe((loggedOut) => {
      if (loggedOut) {
        this.router.navigate(['/login']);
        alert('Session expired. Please log in again.');
      }
    });
  }
}
