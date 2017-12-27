import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentTemplateComponent } from './consignment-template.component';

describe('ConsignmentTemplateComponent', () => {
  let component: ConsignmentTemplateComponent;
  let fixture: ComponentFixture<ConsignmentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignmentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
