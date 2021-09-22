import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopFormNotificationComponent } from './pop-form-notification.component';

describe('PopFormNotificationComponent', () => {
  let component: PopFormNotificationComponent;
  let fixture: ComponentFixture<PopFormNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopFormNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopFormNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
