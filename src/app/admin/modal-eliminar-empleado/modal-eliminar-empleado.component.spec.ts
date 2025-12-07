import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarEmpleadoComponent } from './modal-eliminar-empleado.component';

describe('ModalEliminarEmpleadoComponent', () => {
  let component: ModalEliminarEmpleadoComponent;
  let fixture: ComponentFixture<ModalEliminarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEliminarEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
