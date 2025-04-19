import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SparklineChartComponent } from '../../dashboard/sparkline-chart/sparkline-chart.component';
import { CryptoApiService } from '../../services/crypto-api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  imports: [CommonModule, SparklineChartComponent],
  standalone: true,
})
export class CoinDetailComponent implements OnInit {
  public readonly cryptoApiService = inject(CryptoApiService);

  constructor() {}

  ngOnInit() {}
}
