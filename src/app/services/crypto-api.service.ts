import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, timer } from 'rxjs';
import { CoinData, CoinMetadata } from './crypto-api.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  private readonly apiKey = import.meta.env.NG_APP_COINGECKO_API_KEY;
  private readonly httpClient = inject(HttpClient);
  private readonly headers = {
    'x-cg-demo-api-key': this.apiKey,
  };

  private readonly cryptoDataStore = new BehaviorSubject<CoinData[]>([]);
  public readonly cryptoData$ = this.cryptoDataStore.asObservable();

  private readonly cryptoDataUpdated = new BehaviorSubject<boolean>(false);
  public readonly cryptoDataUpdated$ = this.cryptoDataUpdated.asObservable();

  private readonly selectedCoinStore = new BehaviorSubject<CoinData | null>(
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

  public updateCryptoData(): void {
    this.getCryptoData().subscribe((data) => this.cryptoDataStore.next(data));
  }

  public getCryptoData(): Observable<CoinData[]> {
    return timer(0, 20000).pipe(
      switchMap(() =>
        this.httpClient.get<CoinData[]>(
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
      switchMap(
        (data) =>
          new Observable<CoinData[]>((observer) => {
            const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
            observer.next(sortedData);
            observer.complete();
          }),
      ),
    );
  }

  public getCoinMetadata(id: string): Observable<CoinMetadata> {
    return this.httpClient.get<CoinMetadata>(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          ...this.headers,
        },
        params: {
          localization: false,
          tickers: false,
          market_data: false,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      },
    );
  }

  public selectCoin(coin: CoinData): void {
    this.selectedCoinStore.next(coin);
  }

  public clearSelectedCoin(): void {
    this.selectedCoinStore.next(null);
  }
}
