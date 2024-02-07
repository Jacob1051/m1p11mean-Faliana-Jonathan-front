import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakerdvComponent } from './takerdv.component';

describe('TakerdvComponent', () => {
  let component: TakerdvComponent;
  let fixture: ComponentFixture<TakerdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakerdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakerdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
