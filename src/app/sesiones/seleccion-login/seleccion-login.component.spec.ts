import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionLoginComponent } from './seleccion-login.component';

describe('SeleccionLoginComponent', () => {
  let component: SeleccionLoginComponent;
  let fixture: ComponentFixture<SeleccionLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
