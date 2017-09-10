import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindresultComponent } from './findresult.component';

describe('FindresultComponent', () => {
  let component: FindresultComponent;
  let fixture: ComponentFixture<FindresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
