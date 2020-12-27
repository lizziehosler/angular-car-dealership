import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleDealershipComponent } from './single-dealership.component';

describe('SingleDealershipComponent', () => {
  let component: SingleDealershipComponent;
  let fixture: ComponentFixture<SingleDealershipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDealershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
