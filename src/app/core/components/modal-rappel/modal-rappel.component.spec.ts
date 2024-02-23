import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRappelComponent } from './modal-rappel.component';

describe('ModalRappelComponent', () => {
  let component: ModalRappelComponent;
  let fixture: ComponentFixture<ModalRappelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRappelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRappelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
