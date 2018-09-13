import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundRulesComponent } from './ground-rules.component';

describe('GroundRulesComponent', () => {
  let component: GroundRulesComponent;
  let fixture: ComponentFixture<GroundRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
