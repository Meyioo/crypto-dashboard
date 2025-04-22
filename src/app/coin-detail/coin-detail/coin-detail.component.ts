import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from '../../services/crypto-api.service';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  imports: [CommonModule, LineChartComponent],
  standalone: true,
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  public readonly cryptoApiService = inject(CryptoApiService);
  private readonly route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.cryptoApiService.updateCryptoMetadata(
      this.route.snapshot.params['id'],
    );
  }

  public ngOnDestroy(): void {
    this.cryptoApiService.clearSelectedCoin();
  }
}
