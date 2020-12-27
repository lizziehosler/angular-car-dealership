import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleCarComponent } from './single-car.component';

describe('SingleCarComponent', () => {
  let component: SingleCarComponent;
  let fixture: ComponentFixture<SingleCarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
