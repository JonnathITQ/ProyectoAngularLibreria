import { Component, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Libros } from '../../models/libros';

@Component({
  selector: 'app-m-delete-lib',
  imports: [],
  templateUrl: './m-delete-lib.component.html',
  styleUrl: './m-delete-lib.component.css',
  providers: [LibrosService, LogsService, EmpleadoService],
  standalone: true
})
export class MDeleteLibComponent {
  public idLibroAEliminar: String | null = null;
  public libroAEliminar: Libros | undefined;

  @Output() libroEliminado = new EventEmitter<void>();

  constructor(
    private _librosService: LibrosService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) { }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  prepararEliminacion(id: String, libro: Libros) {
    this.idLibroAEliminar = id;
    this.libroAEliminar = libro;
  }

  confirmarEliminacion() {
    if (this.idLibroAEliminar) {
      this._librosService.deleteLibro(this.idLibroAEliminar).subscribe(
        response => {
          this.logsEliminarLibros(this.libroAEliminar);
          this.libroEliminado.emit();
          this.idLibroAEliminar = null;
          this.libroAEliminar = undefined;
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

  private logsEliminarLibros(libroEliminar: Libros | undefined): void {
    if (!libroEliminar) return;
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'ELIMINAR_LIBRO',
      recurso: 'libro',
      recurso_id: libroEliminar._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} elimino el libro "${libroEliminar.titulo}" (rol: ${actor?.rol})`
    }).subscribe({
      next: () => console.log('Log de eliminar libros registrado'),
      error: (err) => console.error('Error al crear log de eliminar', err)
    });
  }
}
