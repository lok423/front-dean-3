import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSchedulesComponent } from './tutor-schedules.component';

describe('TutorSchedulesComponent', () => {
  let component: TutorSchedulesComponent;
  let fixture: ComponentFixture<TutorSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
