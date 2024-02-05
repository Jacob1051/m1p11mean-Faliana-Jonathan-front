import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddComponent } from './emp-add.component';

describe('IndexComponent', () => {
  let component: EmpAddComponent;
  let fixture: ComponentFixture<EmpAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpAddComponent]
    });
    fixture = TestBed.createComponent(EmpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
