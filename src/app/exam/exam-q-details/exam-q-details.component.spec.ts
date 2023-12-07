import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQDetailsComponent } from './exam-q-details.component';

describe('ExamQDetailsComponent', () => {
  let component: ExamQDetailsComponent;
  let fixture: ComponentFixture<ExamQDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamQDetailsComponent],
    });
    fixture = TestBed.createComponent(ExamQDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
