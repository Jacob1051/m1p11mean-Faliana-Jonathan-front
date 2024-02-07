import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListModalComponent } from './service-list-modal.component';

describe('ServiceListModalComponent', () => {
  let component: ServiceListModalComponent;
  let fixture: ComponentFixture<ServiceListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
