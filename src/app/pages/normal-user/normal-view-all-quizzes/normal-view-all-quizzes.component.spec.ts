import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalViewAllQuizzesComponent } from './normal-view-all-quizzes.component';

describe('NormalViewAllQuizzesComponent', () => {
  let component: NormalViewAllQuizzesComponent;
  let fixture: ComponentFixture<NormalViewAllQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalViewAllQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalViewAllQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
