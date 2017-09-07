import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyadmissionComponent } from './verifyadmission.component';

describe('VerifyadmissionComponent', () => {
  let component: VerifyadmissionComponent;
  let fixture: ComponentFixture<VerifyadmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyadmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyadmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
