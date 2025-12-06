import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-m-add-edit-us',
  imports: [CommonModule, FormsModule],
  templateUrl: './m-add-edit-us.component.html',
  styleUrl: './m-add-edit-us.component.css',
  providers: [UsuarioService, LogsService, EmpleadoService],
  standalone: true
})
export class MAddEditUsComponent {
  public usuario: Usuarios;
  public status: string = "";
  public usuarioOriginal: Usuarios | null = null;

  @Output() usuarioGuardado = new EventEmitter<void>();

  constructor(
    private usuarioService: UsuarioService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    this.usuario = new Usuarios('', '', '', '', '', '', '');
  }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  registrarUsuario(form: any) {
    this.usuarioService.guardarUsuarios(this.usuario).subscribe(
      response => {
        if (response.usuario) {
          this.status = 'success';
          this.logsCrearUsuarios(response.usuario);
          this.usuarioGuardado.emit();
          this.resetForm(form);
          this.cerrarModal();
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

  actualizarUsuario() {
    if (JSON.stringify(this.usuario) === JSON.stringify(this.usuarioOriginal)) {
      console.error("Debes modificar algo para guardar");
      return;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (response.usuario) {
          this.status = 'success';
          this.logsActualizarUsuarios(response.usuario);
          this.usuarioGuardado.emit();
          this.usuario = new Usuarios('', '', '', '', '', '', '');
          this.usuarioOriginal = null;
          this.cerrarModal();
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

  seleccionarUsuario(usuario: Usuarios) {
    this.usuario = { ...usuario };
    this.usuarioOriginal = { ...usuario };
  }

  resetForm(form?: any) {
    if (form) {
      form.reset();
    }
    this.usuario = new Usuarios('', '', '', '', '', '', '');
    this.usuarioOriginal = null;
  }

  cerrarModal() {
    const btnCerrar = document.getElementById('closeModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  private logsCrearUsuarios(usuariosCreados: Usuarios): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'CREAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuariosCreados._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) registró al usuario "${usuariosCreados?.nombre} ${usuariosCreados?.apellido}" con cédula ${usuariosCreados?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de creación de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }

  private logsActualizarUsuarios(usuariosActualizados: Usuarios): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_USUARIO',
      recurso: 'usuario',
      recurso_id: usuariosActualizados._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} (rol: ${actor?.rol}) actualizó los datos del usuario "${usuariosActualizados?.nombre} ${usuariosActualizados?.apellido}" con cédula ${usuariosActualizados?.cedula}.`
    }).subscribe({
      next: () => console.log('Log de actualización de usuario registrado'),
      error: (err) => console.error('Error al registrar log de usuario', err)
    });
  }
}
