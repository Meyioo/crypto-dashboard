import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  public cryptoDataUpdated$ = this.cryptoApiService.cryptoDataUpdated$;
}
