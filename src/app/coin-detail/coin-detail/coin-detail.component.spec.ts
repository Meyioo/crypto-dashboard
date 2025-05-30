/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoinDetailComponent } from './coin-detail.component';

describe('CoinDetailComponent', () => {
  let component: CoinDetailComponent;
  let fixture: ComponentFixture<CoinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoinDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
