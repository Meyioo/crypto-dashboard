import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoinMetadata } from '../../services/crypto-api.model';
import { CryptoApiService } from '../../services/crypto-api.service';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  imports: [CommonModule, LineChartComponent],
  standalone: true,
})
export class CoinDetailComponent {
  public readonly cryptoApiService = inject(CryptoApiService);
  private readonly route = inject(ActivatedRoute);

  public coinMetadata$: Observable<CoinMetadata> = of({} as CoinMetadata);

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.coinMetadata$ = this.cryptoApiService.getCoinMetadata(id);
  }
}
