import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinTableData } from '../services/crypto-api.model';
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

  public readonly cryptoData$ = this.cryptoApiService.cryptoData$;

  public isNameAscending = true;
  public isPriceAscending = true;
  public is24HourChangeAscending = true;

  public ngOnInit(): void {
    this.cryptoApiService.updateCoinTableData();
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['sortBy'] && queryParams['order']) {
      const isAscending = queryParams['order'] === 'asc';
      switch (queryParams['sortBy']) {
        case 'name':
          this.isNameAscending = isAscending;
          break;
        case 'current_price':
          this.isPriceAscending = isAscending;
          break;
        case 'price_change_24h':
          this.is24HourChangeAscending = isAscending;
          break;
      }
    }
  }

  public sortByName(): void {
    this.isNameAscending = !this.isNameAscending;
    this.cryptoApiService.sortCryptoData('name', this.isNameAscending);
    this.updateQueryParams('name', this.isNameAscending);
  }

  public sortByPrice(): void {
    this.isPriceAscending = !this.isPriceAscending;
    this.cryptoApiService.sortCryptoData('current_price', this.isNameAscending);
    this.updateQueryParams('current_price', this.isPriceAscending);
  }

  public sortBy24hChange(): void {
    this.is24HourChangeAscending = !this.is24HourChangeAscending;
    this.cryptoApiService.sortCryptoData(
      'price_change_24h',
      this.isNameAscending,
    );
    this.updateQueryParams('price_change_24h', this.is24HourChangeAscending);
  }

  public goToCoinDetails(coin: CoinTableData): void {
    this.router.navigate(['/coin', coin.id]);
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
}
