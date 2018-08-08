import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFromHomeworkComponent } from './assign-from-homework.component';

describe('AssignFromHomeworkComponent', () => {
  let component: AssignFromHomeworkComponent;
  let fixture: ComponentFixture<AssignFromHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFromHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFromHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
