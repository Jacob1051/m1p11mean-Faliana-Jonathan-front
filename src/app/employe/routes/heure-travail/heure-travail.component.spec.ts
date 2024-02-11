import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeureTravailComponent } from './heure-travail.component';

describe('HeureTravailComponent', () => {
  let component: HeureTravailComponent;
  let fixture: ComponentFixture<HeureTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeureTravailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeureTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
