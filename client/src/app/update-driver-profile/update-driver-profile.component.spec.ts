import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDriverProfileComponent } from './update-driver-profile.component';

describe('UpdateDriverProfileComponent', () => {
  let component: UpdateDriverProfileComponent;
  let fixture: ComponentFixture<UpdateDriverProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDriverProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDriverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
