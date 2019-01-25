import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUtilsComponent } from './image-utils.component';

describe('ImageUtilsComponent', () => {
  let component: ImageUtilsComponent;
  let fixture: ComponentFixture<ImageUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
