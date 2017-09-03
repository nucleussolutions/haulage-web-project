import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForwarderProfileComponent } from './update-forwarder-profile.component';

describe('UpdateForwarderProfileComponent', () => {
  let component: UpdateForwarderProfileComponent;
  let fixture: ComponentFixture<UpdateForwarderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateForwarderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateForwarderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
