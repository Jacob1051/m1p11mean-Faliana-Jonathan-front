import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpListComponent } from './emp-list.component';

describe('IndexComponent', () => {
  let component: EmpListComponent;
  let fixture: ComponentFixture<EmpListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpListComponent]
    });
    fixture = TestBed.createComponent(EmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
