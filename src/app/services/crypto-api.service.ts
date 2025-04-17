import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  constructor(private readonly http: HttpClient) {}

  public getCryptoData(): Observable<any> {
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: '20',
      page: '1',
      sparkline: 'false',
    };

    const headers = {
      'x-cg-demo-api-key': 'CG-PyFcAW2A43PQUcBvywjvbx7p',
    };

    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', {
      params,
      headers,
    });
  }
}
