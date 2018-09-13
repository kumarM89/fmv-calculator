import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxFileUploadComponent } from './xlsx-file-upload.component';

describe('XlsxFileUploadComponent', () => {
  let component: XlsxFileUploadComponent;
  let fixture: ComponentFixture<XlsxFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsxFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsxFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
