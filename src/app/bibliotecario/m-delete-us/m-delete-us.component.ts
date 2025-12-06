import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-m-delete-us',
  imports: [],
  templateUrl: './m-delete-us.component.html',
  styleUrl: './m-delete-us.component.css',
  providers: [UsuarioService, LogsService, EmpleadoService],
  standalone: true
})
export class MDeleteUsComponent {
  public idUsuarioAEliminar: String | null = null;
  public usuarioAEliminar: Usuarios | undefined;

  @Output() usuarioEliminado = new EventEmitter<void>();

  constructor(
    private usuarioService: UsuarioService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) { }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  prepararEliminacion(id: String, usuario: Usuarios) {
    this.idUsuarioAEliminar = id;
    this.usuarioAEliminar = usuario;
  }

  confirmarEliminacion() {
    if (this.idUsuarioAEliminar) {
      this.usuarioService.deleteUsuario(this.idUsuarioAEliminar).subscribe(
        response => {
          this.logsEliminarUsuarios(this.usuarioAEliminar);
          this.usuarioEliminado.emit();
          this.idUsuarioAEliminar = null;
          this.usuarioAEliminar = undefined;
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

  private logsEliminarUsuarios(usuarioEliminado: Usuarios | undefined): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'ELIMINAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuarioEliminado?._id,
      descripcion: usuarioEliminado
        ? `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó al usuario "${usuarioEliminado?.nombre} ${usuarioEliminado?.apellido}" con cédula ${usuarioEliminado?.cedula}.`
        : `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) eliminó un usuario.`
    }).subscribe({
      next: () => console.log('Log de eliminación de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }
}
