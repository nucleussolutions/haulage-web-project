import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsignmentModalComponent } from './create-consignment-modal.component';

describe('CreateConsignmentModalComponent', () => {
  let component: CreateConsignmentModalComponent;
  let fixture: ComponentFixture<CreateConsignmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConsignmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConsignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
