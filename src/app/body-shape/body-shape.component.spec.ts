import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyShapeComponent } from './body-shape.component';

describe('BodyShapeComponent', () => {
  let component: BodyShapeComponent;
  let fixture: ComponentFixture<BodyShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
