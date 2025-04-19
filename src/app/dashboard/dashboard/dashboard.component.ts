import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class DashboardComponent implements OnInit {
  private readonly cryptoApiService = inject(CryptoApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public cryptoData$ = this.cryptoApiService.cryptoData$;

  public isNameAscending = true;
  public isPriceAscending = true;
  public is24HourChangeAscending = true;

  ngOnInit(): void {
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
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.isNameAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      })
    );
    if (updateUrl) {
      this.updateQueryParams('name', this.isNameAscending);
    }
    this.isNameAscending = !this.isNameAscending;
  }

  public sortByPrice(updateUrl = true): void {
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.isPriceAscending
            ? a.current_price - b.current_price
            : b.current_price - a.current_price
        );
      })
    );
    if (updateUrl) {
      this.updateQueryParams('price', this.isPriceAscending);
    }
    this.isPriceAscending = !this.isPriceAscending;
  }

  public sortBy24hChange(updateUrl = true): void {
    this.cryptoData$ = this.cryptoData$.pipe(
      map((data) => {
        return data.sort((a, b) =>
          this.is24HourChangeAscending
            ? a.price_change_percentage_24h - b.price_change_percentage_24h
            : b.price_change_percentage_24h - a.price_change_percentage_24h
        );
      })
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

  goToCoinDetails(id: string): void {
    this.router.navigate(['/coin', id]);
  }
}
