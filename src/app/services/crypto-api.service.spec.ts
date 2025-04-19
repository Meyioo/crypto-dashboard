/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CryptoApiService } from './crypto-api.service';

describe('Service: CryptoApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoApiService],
    });
  });

  it('should ...', inject([CryptoApiService], (service: CryptoApiService) => {
    expect(service).toBeTruthy();
  }));
});
