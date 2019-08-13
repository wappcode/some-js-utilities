import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorUtilitiesComponent } from './color-utilities.component';

describe('ColorUtilitiesComponent', () => {
  let component: ColorUtilitiesComponent;
  let fixture: ComponentFixture<ColorUtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorUtilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
