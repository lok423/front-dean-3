import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSessionsComponent } from './book-sessions.component';

describe('BookSessionsComponent', () => {
  let component: BookSessionsComponent;
  let fixture: ComponentFixture<BookSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
