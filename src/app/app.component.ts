import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from './core/header/header.component';
import { CryptoApiService } from './services/crypto-api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crypto-dashboard';

  public readonly cryptoApiService = inject(CryptoApiService);

  constructor() {}
}
