/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetworkStatusService } from './network-status.service';

describe('Service: NetworkStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkStatusService]
    });
  });

  it('should ...', inject([NetworkStatusService], (service: NetworkStatusService) => {
    expect(service).toBeTruthy();
  }));
});
