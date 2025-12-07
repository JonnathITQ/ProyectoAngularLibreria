import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroEditEmpleadoComponent } from './modal-registro-edit-empleado.component';

describe('ModalRegistroEditEmpleadoComponent', () => {
  let component: ModalRegistroEditEmpleadoComponent;
  let fixture: ComponentFixture<ModalRegistroEditEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegistroEditEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistroEditEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
