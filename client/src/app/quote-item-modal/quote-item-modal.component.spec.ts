import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteItemModalComponent } from './quote-item-modal.component';

describe('QuoteItemModalComponent', () => {
  let component: QuoteItemModalComponent;
  let fixture: ComponentFixture<QuoteItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
