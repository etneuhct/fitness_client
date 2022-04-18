import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikingComponent } from './biking.component';

describe('BikingComponent', () => {
  let component: BikingComponent;
  let fixture: ComponentFixture<BikingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
