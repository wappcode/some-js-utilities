import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasUtilitiesComponent } from './canvas-utilities.component';

describe('CanvasUtilitiesComponent', () => {
  let component: CanvasUtilitiesComponent;
  let fixture: ComponentFixture<CanvasUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasUtilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
