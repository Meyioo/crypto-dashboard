import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NetworkStatusService } from '../../services/network-status.service';

@Component({
  selector: 'app-offline-banner',
  templateUrl: './offline-banner.component.html',
  styleUrls: ['./offline-banner.component.css'],
  imports: [CommonModule],
})
export class OfflineBannerComponent {
  public readonly networkStatusService = inject(NetworkStatusService);
}
