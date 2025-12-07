import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../services/empleados.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-modal-eliminar-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-eliminar-empleado.component.html',
  styleUrl: './modal-eliminar-empleado.component.css',
  providers: [EmpleadosService, LogsService]
})
export class ModalEliminarEmpleadoComponent {
  @Output() empleadoEliminado = new EventEmitter<void>();

  public idEmpleadoEliminar: String | null = null;

  constructor(
    private empleadoService: EmpleadosService,
    private _logService: LogsService,
    private empleadosService: EmpleadoService
  ) { }

  private getActor() {
    return this.empleadosService.getEmpleado();
  }

  abrirModal(id: String) {
    this.idEmpleadoEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idEmpleadoEliminar) {
      this.empleadoService.deleteEmpleados(this.idEmpleadoEliminar).subscribe(
        response => {
          this.empleadoEliminado.emit();
          this.idEmpleadoEliminar = null;
          this.cerrarModalEliminar();
          this.logsEliminarEmpleado(response.empleado);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cerrarModalEliminar() {
    const btnCerrar = document.getElementById('closeDeleteModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  private logsEliminarEmpleado(empleadoElminado: Empleado | undefined): void {
    var actor = this.getActor();
    this._logService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'ELIMINAR_EMPLEADO',
      recurso: 'empleado',
      recurso_id: empleadoElminado?._id,
      descripcion: empleadoElminado
        ? `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó al empleado "${empleadoElminado?.nombre} ${empleadoElminado?.apellido}" con cédula ${empleadoElminado?.cedula}.`
        : `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó un empleado.`
    }).subscribe({
      next: () => console.log('Log de eliminación de empleado registrado'),
      error: (err) => console.error('Error al registrar log de empleado', err)
    });
  }
}
