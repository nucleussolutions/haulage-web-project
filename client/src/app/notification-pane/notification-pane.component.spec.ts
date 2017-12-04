import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPaneComponent } from './notification-pane.component';

describe('NotificationPaneComponent', () => {
  let component: NotificationPaneComponent;
  let fixture: ComponentFixture<NotificationPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
