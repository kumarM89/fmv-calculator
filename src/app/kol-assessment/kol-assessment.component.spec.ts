import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolAssessmentComponent } from './kol-assessment.component';

describe('KolAssessmentComponent', () => {
  let component: KolAssessmentComponent;
  let fixture: ComponentFixture<KolAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
