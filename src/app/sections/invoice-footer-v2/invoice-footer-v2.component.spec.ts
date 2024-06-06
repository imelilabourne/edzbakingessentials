import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFooterV2Component } from './invoice-footer-v2.component';

describe('InvoiceFooterV2Component', () => {
  let component: InvoiceFooterV2Component;
  let fixture: ComponentFixture<InvoiceFooterV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFooterV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFooterV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
