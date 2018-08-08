import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankParentComponent } from './fill-blank-parent.component';

describe('FillBlankParentComponent', () => {
  let component: FillBlankParentComponent;
  let fixture: ComponentFixture<FillBlankParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlankParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
