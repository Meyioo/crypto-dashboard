import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, timer } from 'rxjs';
import { CoinData } from './crypto-api.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  private readonly apiKey = import.meta.env.NG_APP_COINGECKO_API_KEY;
  private readonly httpClient = inject(HttpClient);
  private readonly headers = {
    'x-cg-demo-api-key': this.apiKey,
  };
  private readonly params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 20,
    page: 1,
    sparkline: true,
  };

  private readonly cryptoDataStore = new BehaviorSubject<CoinData[]>([]);
  public readonly cryptoData$ = this.cryptoDataStore.asObservable();

  private readonly cryptoDataUpdated = new BehaviorSubject<boolean>(false);
  public readonly cryptoDataUpdated$ = this.cryptoDataUpdated.asObservable();

  private readonly selectedCoinStore = new BehaviorSubject<CoinData | null>(
    null,
  );
  public readonly selectedCoin$ = this.selectedCoinStore.asObservable();

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
    return timer(0, 200000).pipe(
      switchMap(() =>
        this.httpClient.get<CoinData[]>(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: this.params,
            headers: this.headers,
          },
        ),
      ),
    );
  }

  public selectCoin(coin: CoinData): void {
    this.selectedCoinStore.next(coin);
  }

  public clearSelectedCoin(): void {
    this.selectedCoinStore.next(null);
  }
}
