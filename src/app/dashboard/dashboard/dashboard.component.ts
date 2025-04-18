import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { HeaderComponent } from '../../core/header/header.component';
import { CryptoApiService } from '../../services/crypto-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent],
})
export class DashboardComponent {
  private readonly cryptoApiService = inject(CryptoApiService);
  public cryptoData$ = this.cryptoApiService.getCryptoData();

  public isNameAscending = true;
  public isPriceAscending = true;
  public is24HourChangeAscending = true;

  public sortByName(): void {
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.isNameAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      })
    );
    this.isNameAscending = !this.isNameAscending;
  }

  public sortByPrice(): void {
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.isPriceAscending
            ? a.current_price - b.current_price
            : b.current_price - a.current_price
        );
      })
    );
    this.isPriceAscending = !this.isPriceAscending;
  }

  public sortBy24hChange(): void {
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.is24HourChangeAscending
            ? a.price_change_percentage_24h - b.price_change_percentage_24h
            : b.price_change_percentage_24h - a.price_change_percentage_24h
        );
      })
    );
    this.is24HourChangeAscending = !this.is24HourChangeAscending;
  }
}
