import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CryptoApiService } from '../../services/crypto-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  private readonly cryptoApiService = inject(CryptoApiService);
  public cryptoDataUpdated$ = this.cryptoApiService.cryptoDataUpdated$;

  constructor() {}

  ngOnInit() {}
}
