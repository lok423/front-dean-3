import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainComponent } from './dashboard-tutor-main.component';

describe('DashboardTutorMainComponent', () => {
  let component: DashboardMainComponent;
  let fixture: ComponentFixture<DashboardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
