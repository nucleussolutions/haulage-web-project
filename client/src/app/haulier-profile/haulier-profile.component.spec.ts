import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulierProfileComponent } from './haulier-profile.component';

describe('HaulierProfileComponent', () => {
  let component: HaulierProfileComponent;
  let fixture: ComponentFixture<HaulierProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulierProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
