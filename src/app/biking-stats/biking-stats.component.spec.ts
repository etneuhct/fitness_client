import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikingStatsComponent } from './biking-stats.component';

describe('BikingStatsComponent', () => {
  let component: BikingStatsComponent;
  let fixture: ComponentFixture<BikingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikingStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
