import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  private readonly onlineSubject = new BehaviorSubject<boolean>(
    navigator.onLine,
  );
  public online$ = this.onlineSubject.asObservable();

  constructor(private readonly zone: NgZone) {
    window.addEventListener('online', () => this.updateStatus(true));
    window.addEventListener('offline', () => this.updateStatus(false));
  }

  private updateStatus(isOnline: boolean) {
    this.zone.run(() => this.onlineSubject.next(isOnline));
  }
}
