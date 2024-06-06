import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFooterComponent } from './invoice-footer.component';

describe('InvoiceFooterComponent', () => {
  let component: InvoiceFooterComponent;
  let fixture: ComponentFixture<InvoiceFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
