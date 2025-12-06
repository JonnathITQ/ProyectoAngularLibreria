import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../models/prestamos';
import { PrestamosService } from '../../services/prestamos.service';
import { LibrosService } from '../../services/libros.service';
import { UsuarioService } from '../../services/usuario.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Libros } from '../../models/libros';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-m-add-edit-p',
  imports: [CommonModule, FormsModule],
  templateUrl: './m-add-edit-p.component.html',
  styleUrl: './m-add-edit-p.component.css',
  providers: [PrestamosService, LibrosService, UsuarioService, EmpleadoService, LogsService],
  standalone: true
})
export class MAddEditPComponent implements OnInit {
  public listaLibros: Libros[] = [];
  public listaUsuarios: Usuarios[] = [];
  public prestamo: Prestamos;
  public status: string = "";

  @Output() prestamoGuardado = new EventEmitter<void>();

  constructor(
    private _prestamosService: PrestamosService,
    private _librosService: LibrosService,
    private _usuarioService: UsuarioService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    this.prestamo = new Prestamos('', '', '', '', 0, false);
  }

  ngOnInit(): void {
    this.obtenerLibros();
    this.obtenerUsuarios();
  }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  obtenerLibros() {
    this._librosService.verLibros().subscribe(
      response => {
        this.listaLibros = response.libro;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerUsuarios() {
    this._usuarioService.verUsuarios().subscribe(
      response => {
        this.listaUsuarios = response.usuario;
      },
      error => {
        console.log(error);
      }
    );
  }

  registrarPrestamo(form: any) {
    this._prestamosService.guardarPrestamo(this.prestamo).subscribe(
      response => {
        if (response.prestamo) {
          this.status = 'success';
          this.logsCrearPrestamos(response.prestamo);
          this.prestamoGuardado.emit();
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

  actualizarPrestamo() {
    this._prestamosService.actualizarPrestamo(this.prestamo).subscribe(
      response => {
        if (response.prestamo) {
          this.status = 'success';
          this.logsActualizarPrestamos(response.prestamo);
          this.prestamoGuardado.emit();
          this.resetForm();
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

  seleccionarPrestamo(prestamo: Prestamos) {
    // Clone the object to avoid modifying the list directly
    this.prestamo = { ...prestamo };

    // Ensure IDs are set correctly for the select elements
    if (typeof this.prestamo.usuario_id === 'object' && this.prestamo.usuario_id !== null) {
      this.prestamo.usuario_id = (this.prestamo.usuario_id as any)._id;
    }
    if (typeof this.prestamo.libros_id === 'object' && this.prestamo.libros_id !== null) {
      this.prestamo.libros_id = (this.prestamo.libros_id as any)._id;
    }
  }

  resetForm(form?: any) {
    if (form) {
      form.reset();
    }
    this.prestamo = new Prestamos('', '', '', '', 0, false);
  }

  cerrarModal() {
    const btnCerrar = document.getElementById('closeModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  //logs para eliminar, actualizar y crear un prestamo
  private logsActualizarPrestamos(prestamoActualizado: Prestamos): void {
    const actor = this.getActor();
    var usuario = prestamoActualizado.usuario_id as any;
    var libro = prestamoActualizado.libros_id as any;
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_PRESTAMO',
      recurso: 'prestamo',
      recurso_id: prestamoActualizado._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} con rol: ${actor?.rol}) actualizó el préstamo del libro "${libro?.titulo}" al usuario "${usuario?.nombre} ${usuario?.apellido}".`
    }).subscribe({
      next: () => console.log('Log de actualización de préstamo registrado'),
      error: (err) => console.error('Error al registrar log de préstamo', err)
    });
  }

  private logsCrearPrestamos(prestamoCreado: Prestamos): void {
    var actor = this.getActor();
    // Si el backend hace populate, obtener sus datos:
    var usuario = prestamoCreado.usuario_id as any;
    var libro = prestamoCreado.libros_id as any;

    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'CREAR_PRESTAMO',
      recurso: 'prestamo',
      recurso_id: prestamoCreado._id,
      descripcion: `El empleado ${actor?.nombre} ${actor?.apellido} con rol: ${actor?.rol}) registró un préstamo del libro "${libro?.titulo}" al usuario "${usuario?.nombre} ${usuario?.apellido}".`
    }).subscribe({
      next: () => console.log('Log de creación de préstamo registrado'),
      error: (err) => console.error('Error al registrar log de préstamo', err)
    });
  }
}
