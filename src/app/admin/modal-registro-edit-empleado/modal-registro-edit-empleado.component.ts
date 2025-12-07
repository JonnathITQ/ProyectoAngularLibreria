import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-modal-registro-edit-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-registro-edit-empleado.component.html',
  styleUrl: './modal-registro-edit-empleado.component.css',
  providers: [EmpleadosService, LogsService]
})
export class ModalRegistroEditEmpleadoComponent {
  @Output() empleadoGuardado = new EventEmitter<void>();

  public empleado: Empleado;
  public status: string = "";
  public empleadoOriginal: Empleado | null = null;

  constructor(
    private empleadoService: EmpleadosService,
    private _logService: LogsService,
    private empleadosService: EmpleadoService
  ) {
    this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
  }

  private getActor() {
    return this.empleadosService.getEmpleado();
  }

  abrirModal(empleado?: Empleado) {
    if (empleado) {
      this.empleado = { ...empleado };
      this.empleadoOriginal = { ...empleado };
    } else {
      this.resetForm();
    }
  }

  registrarEmpleado(form: any) {
    this.empleado.rol = ('bibliotecario')
    this.empleadoService.guardarEmpleados(this.empleado).subscribe(
      response => {
        if (response.empleado) {
          this.status = 'success';
          this.empleadoGuardado.emit();
          this.resetForm(form);
          this.cerrarModal();
          this.logsCrearEmpleado(response.empleado);
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  actualizarEmpleado() {
    if (JSON.stringify(this.empleado) === JSON.stringify(this.empleadoOriginal)) {
      console.error("Debes modificar algo para guardar");
      return;
    }

    this.empleadoService.actualizarEmpleados(this.empleado).subscribe(
      response => {
        if (response.empleado) {
          this.status = 'success';
          this.empleadoGuardado.emit();
          this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
          this.empleadoOriginal = null;
          this.cerrarModal();
          this.logsActualizarEmpleado(response.empleado);

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  resetForm(form?: any) {
    if (form) {
      form.reset();
    }
    this.empleado = new Empleado('', '', '', 0, '', '', '', '', '', '');
    this.empleadoOriginal = null;
  }

  cerrarModal() {
    const btnCerrar = document.getElementById('closeModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  private logsCrearEmpleado(empleadoCreado: Empleado): void {
    var actor = this.getActor();
    this._logService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'CREAR_EMPLEADO',
      recurso: 'empleado',
      recurso_id: empleadoCreado._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) registró al empleado "${empleadoCreado?.nombre} ${empleadoCreado?.apellido}" con cédula ${empleadoCreado?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de creación de empleado registrado'),
      error: (err) => console.error('Error al registrar log de empleado', err)
    });
  }

  private logsActualizarEmpleado(empleadoActualizado: Empleado): void {
    var actor = this.getActor();
    this._logService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_EMPLEADO',
      recurso: 'empleado',
      recurso_id: empleadoActualizado._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) actualizó los datos del empleado "${empleadoActualizado?.nombre} ${empleadoActualizado?.apellido}" con cédula ${empleadoActualizado?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de actualización de empleado registrado'),
      error: (err) => console.error('Error al registrar log de empleado', err)
    });
  }
}
