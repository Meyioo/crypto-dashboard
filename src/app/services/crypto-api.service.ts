import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { interval, Observable, switchMap } from 'rxjs';
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
    per_page: '20',
    page: '1',
    sparkline: 'false',
  };

  public getCryptoData(): Observable<CoinData[]> {
    return interval(10000000).pipe(
      switchMap(() =>
        this.httpClient.get<CoinData[]>(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: this.params,
            headers: this.headers,
          }
        )
      )
    );
  }
}
