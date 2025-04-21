import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoinMetadata } from '../../services/crypto-api.model';
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
export class CoinDetailComponent {
  public readonly cryptoApiService = inject(CryptoApiService);

  public coinMetadata$: Observable<CoinMetadata> = of({} as CoinMetadata);

  @Input() set id(id: string) {
    this.coinMetadata$ = this.cryptoApiService.getCoinMetadata(id);
  }
}
