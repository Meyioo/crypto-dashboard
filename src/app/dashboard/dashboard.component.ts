import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinData } from '../services/crypto-api.model';
import { CryptoApiService } from '../services/crypto-api.service';
import { SparklineChartComponent } from '../shared/sparkline-chart/sparkline-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, SparklineChartComponent],
})
export class DashboardComponent implements OnInit {
  public readonly cryptoApiService = inject(CryptoApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public cryptoData$ = this.cryptoApiService.cryptoData$;

  public isNameAscending = true;
  public isPriceAscending = true;
  public is24HourChangeAscending = true;

  public ngOnInit(): void {
    this.cryptoApiService.updateCryptoData();

    this.route.queryParams.subscribe((params) => {
      const sortBy = params['sortBy'];
      const order = params['order'];

      if (sortBy && order) {
        const isAscending = order === 'asc';
        switch (sortBy) {
          case 'name':
            this.isNameAscending = isAscending;
            this.sortByName(false);
            break;
          case 'price':
            this.isPriceAscending = isAscending;
            this.sortByPrice(false);
            break;
          case '24hChange':
            this.is24HourChangeAscending = isAscending;
            this.sortBy24hChange(false);
            break;
        }
      }
    });
  }

  public sortByName(updateUrl = true): void {
    this.cryptoApiService.sortCryptoData('name', this.isNameAscending);
    if (updateUrl) {
      this.updateQueryParams('name', this.isNameAscending);
    }
    this.isNameAscending = !this.isNameAscending;
  }

  public sortByPrice(updateUrl = true): void {
    this.cryptoApiService.sortCryptoData(
      'current_price',
      this.isPriceAscending,
    );

    if (updateUrl) {
      this.updateQueryParams('price', this.isPriceAscending);
    }
    this.isPriceAscending = !this.isPriceAscending;
  }

  public sortBy24hChange(updateUrl = true): void {
    this.cryptoApiService.sortCryptoData(
      'price_change_24h',
      this.is24HourChangeAscending,
    );

    if (updateUrl) {
      this.updateQueryParams('24hChange', this.is24HourChangeAscending);
    }
    this.is24HourChangeAscending = !this.is24HourChangeAscending;
  }

  private updateQueryParams(sortBy: string, isAscending: boolean): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy,
        order: isAscending ? 'asc' : 'desc',
      },
      queryParamsHandling: 'merge',
    });
  }

  goToCoinDetails(coin: CoinData): void {
    this.cryptoApiService.selectCoin(coin);
    this.router.navigate(['/coin', coin.id]);
  }
}
