import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, timer } from 'rxjs';
import { CoinMetadata, CoinTableData } from './crypto-api.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  private readonly apiKey = import.meta.env.NG_APP_COINGECKO_API_KEY;
  private readonly httpClient = inject(HttpClient);
  private readonly headers = {
    'x-cg-demo-api-key': this.apiKey,
  };

  private readonly cryptoDataStore = new BehaviorSubject<CoinTableData[]>([]);
  public readonly cryptoData$ = this.cryptoDataStore.asObservable();

  private readonly cryptoDataUpdated = new BehaviorSubject<boolean>(false);
  public readonly cryptoDataUpdated$ = this.cryptoDataUpdated.asObservable();

  private readonly selectedCoinStore = new BehaviorSubject<CoinMetadata | null>(
    null,
  );
  public readonly selectedCoin$ = this.selectedCoinStore.asObservable();

  public sortCryptoData(
    criteria: 'name' | 'current_price' | 'price_change_24h',
    ascending: boolean,
  ): void {
    const currentData = this.cryptoDataStore.getValue();
    const sortedData = [...currentData].sort((a, b) => {
      if (criteria === 'name') {
        return ascending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (criteria === 'current_price') {
        return ascending
          ? a.current_price - b.current_price
          : b.current_price - a.current_price;
      } else {
        return ascending
          ? a.price_change_24h - b.price_change_24h
          : b.price_change_24h - a.price_change_24h;
      }
    });
    this.cryptoDataStore.next(sortedData);
  }

  constructor() {
    this.cryptoData$.subscribe(() => {
      this.cryptoDataUpdated.next(true);
      setTimeout(() => this.cryptoDataUpdated.next(false), 3000);
    });
  }

  public updateCoinTableData(): void {
    this.getCoinTableData().subscribe((data) =>
      this.cryptoDataStore.next(data),
    );
  }

  public getCoinTableData(): Observable<CoinTableData[]> {
    return timer(0, 10000).pipe(
      switchMap(() =>
        this.httpClient.get<CoinTableData[]>(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            headers: this.headers,
            params: {
              vs_currency: 'usd',
              per_page: 20,
              sparkline: true,
            },
          },
        ),
      ),
    );
  }

  public updateCryptoMetadata(id: string): void {
    this.getCoinMetadata(id).subscribe((data) =>
      this.selectedCoinStore.next(data),
    );
  }

  public getCoinMetadata(id: string): Observable<CoinMetadata> {
    return timer(0, 10000).pipe(
      switchMap(() =>
        this.httpClient.get<CoinMetadata>(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            headers: this.headers,
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: false,
              developer_data: false,
              sparkline: true,
            },
          },
        ),
      ),
    );
  }

  public selectCoin(coin: CoinMetadata): void {
    this.selectedCoinStore.next(coin);
  }

  public clearSelectedCoin(): void {
    this.selectedCoinStore.next(null);
  }
}
