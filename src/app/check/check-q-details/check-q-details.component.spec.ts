import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQDetailsComponent } from './check-q-details.component';

describe('CheckQDetailsComponent', () => {
  let component: CheckQDetailsComponent;
  let fixture: ComponentFixture<CheckQDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckQDetailsComponent],
    });
    fixture = TestBed.createComponent(CheckQDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
