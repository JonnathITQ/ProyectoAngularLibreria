import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionComponent } from './modal-seleccion.component';

describe('ModalSeleccionComponent', () => {
  let component: ModalSeleccionComponent;
  let fixture: ComponentFixture<ModalSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSeleccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
