import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CryptoApiService } from './services/crypto-api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crypto-dashboard';

  public readonly cryptoApiService = inject(CryptoApiService);

  constructor() {}
}
