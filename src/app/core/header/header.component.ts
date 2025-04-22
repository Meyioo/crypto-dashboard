import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CryptoApiService } from '../../services/crypto-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class HeaderComponent {
  private readonly cryptoApiService = inject(CryptoApiService);
  private readonly authService = inject(AuthService);
  public cryptoDataUpdated$ = this.cryptoApiService.cryptoDataUpdated$;

  public logout(): void {
    this.cryptoApiService.clearSelectedCoin();
    this.authService.logout();
  }
}
