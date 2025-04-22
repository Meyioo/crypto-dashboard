import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AuthService } from './services/auth.service';
import { OfflineBannerComponent } from './shared/offline-banner/offline-banner.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    OfflineBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'crypto-dashboard';

  public readonly authService = inject(AuthService);
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
