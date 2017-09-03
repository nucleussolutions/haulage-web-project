import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHaulierProfileComponent } from './update-haulier-profile.component';

describe('UpdateHaulierProfileComponent', () => {
  let component: UpdateHaulierProfileComponent;
  let fixture: ComponentFixture<UpdateHaulierProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHaulierProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHaulierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
