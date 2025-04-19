import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CryptoApiService } from '../../services/crypto-api.service';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  imports: [CommonModule, LineChartComponent],
  providers: [],
  standalone: true,
})
export class CoinDetailComponent implements OnInit {
  public readonly cryptoApiService = inject(CryptoApiService);

  constructor() {}

  ngOnInit() {}
}
