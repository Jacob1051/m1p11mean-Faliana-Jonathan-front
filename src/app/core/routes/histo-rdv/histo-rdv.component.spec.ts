import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoRdvComponent } from './histo-rdv.component';

describe('HistoRdvComponent', () => {
  let component: HistoRdvComponent;
  let fixture: ComponentFixture<HistoRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
