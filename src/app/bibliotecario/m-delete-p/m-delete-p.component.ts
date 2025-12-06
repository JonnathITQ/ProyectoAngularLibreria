import { Component, EventEmitter, Output } from '@angular/core';
import { PrestamosService } from '../../services/prestamos.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Prestamos } from '../../models/prestamos';

@Component({
  selector: 'app-m-delete-p',
  imports: [],
  templateUrl: './m-delete-p.component.html',
  styleUrl: './m-delete-p.component.css',
  providers: [PrestamosService, LogsService, EmpleadoService],
  standalone: true
})
export class MDeletePComponent {
  public idPrestamoAEliminar: String | null = null;
  public prestamoAEliminar: Prestamos | undefined;

  @Output() prestamoEliminado = new EventEmitter<void>();

  constructor(
    private _prestamosService: PrestamosService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) { }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  prepararEliminacion(id: String, prestamo: Prestamos) {
    this.idPrestamoAEliminar = id;
    this.prestamoAEliminar = prestamo;
  }

  confirmarEliminacion() {
    if (this.idPrestamoAEliminar) {
      this._prestamosService.borrarPrestamo(this.idPrestamoAEliminar).subscribe(
        response => {
          this.logsEliminarPrestamo(this.prestamoAEliminar);
          this.prestamoEliminado.emit();
          this.idPrestamoAEliminar = null;
          this.prestamoAEliminar = undefined;
          this.cerrarModalEliminar();
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

  private logsEliminarPrestamo(prestamoEliminado: Prestamos | undefined): void {
    var actor = this.getActor();
    var libro = prestamoEliminado?.libros_id as any;
    var usuario = prestamoEliminado?.usuario_id as any;
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'ELIMINAR_PRESTAMO',
      recurso: 'prestamo',
      recurso_id: prestamoEliminado?._id,
      descripcion: prestamoEliminado
        ? `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó el préstamo del libro "${libro?.titulo}" al usuario "${usuario?.nombre} ${usuario?.apellido}".`
        : `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó un préstamo.`
    }).subscribe({
      next: () => console.log('Log de eliminación de préstamo registrado'),
      error: (err) => console.error('Error al registrar log de préstamo', err)
    });
  }
}
