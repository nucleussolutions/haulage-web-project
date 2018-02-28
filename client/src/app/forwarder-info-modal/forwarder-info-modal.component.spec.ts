import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwarderInfoModalComponent } from './forwarder-info-modal.component';

describe('ForwarderInfoModalComponent', () => {
  let component: ForwarderInfoModalComponent;
  let fixture: ComponentFixture<ForwarderInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwarderInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwarderInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
