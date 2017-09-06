import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwarderProfileComponent } from './forwarder-profile.component';

describe('ForwarderProfileComponent', () => {
  let component: ForwarderProfileComponent;
  let fixture: ComponentFixture<ForwarderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwarderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwarderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
