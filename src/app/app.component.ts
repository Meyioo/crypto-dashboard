import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoApiService } from './services/crypto-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crypto-dashboard';

  constructor(private readonly cryptoApiService: CryptoApiService) {
    console.log('AppComponent initialized');
    this.cryptoApiService.getCryptoData().subscribe((data) => {
      console.log('Crypto Data:', data);
    });
  }
}
