import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';

@Component({
  selector: 'app-m-add-edit-lib',
  imports: [CommonModule, FormsModule],
  templateUrl: './m-add-edit-lib.component.html',
  styleUrl: './m-add-edit-lib.component.css',
  providers: [LibrosService, LogsService, EmpleadoService],
  standalone: true
})
export class MAddEditLibComponent {
  public libro: Libros;
  public status: string = "";
  public libroOriginal: Libros | null = null;
  public archivoSeleccionado: File | null = null;
  public url: string = urlMongo.url;

  @Output() libroGuardado = new EventEmitter<void>();

  constructor(
    private _librosService: LibrosService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
  }

  private getActor() {
    return this._empleadoService.getEmpleado();
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  registrarLibro(form: any) {
    this._librosService.guardarLibros(this.libro).subscribe(
      response => {
        if (response.libro) {
          const libroId = response.libro._id;
          if (this.archivoSeleccionado) {
            this._librosService.subirImagen(libroId, this.archivoSeleccionado).subscribe(
              result => {
                this.finalizarRegistro(form, response.libro);
              },
              error => {
                console.log(error);
                this.status = 'failed';
              }
            );
          } else {
            this.finalizarRegistro(form, response.libro);
          }
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

  finalizarRegistro(form: any, libroCreado: Libros) {
    this.status = 'success';
    this.logsCrearLibros(libroCreado);
    this.libroGuardado.emit();
    this.resetForm(form);
    this.cerrarModal();
  }

  actualizarLibro() {
    this._librosService.actualizarLibros(this.libro).subscribe(
      response => {
        if (response.libro) {
          if (this.archivoSeleccionado) {
            this._librosService.subirImagen(this.libro._id as string, this.archivoSeleccionado).subscribe(
              result => {
                this.finalizarActualizacion(response.libro);
              },
              error => {
                console.log(error);
              }
            )
          } else {
            this.finalizarActualizacion(response.libro);
          }
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

  finalizarActualizacion(libroActualizado: Libros) {
    this.status = 'success';
    this.logsActualizarLibros(libroActualizado);
    this.libroGuardado.emit();
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
    this.libroOriginal = null;
    this.archivoSeleccionado = null;
    this.cerrarModal();
  }

  seleccionarLibro(libro: Libros) {
    this.libro = { ...libro };
    this.libroOriginal = { ...libro };
    this.archivoSeleccionado = null;
  }

  resetForm(form?: any) {
    if (form) {
      form.reset();
    }
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
    this.libroOriginal = null;
    this.archivoSeleccionado = null;
  }

  cerrarModal() {
    const btnCerrar = document.getElementById('closeModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  private logsCrearLibros(crearLibro: Libros): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'CREAR_LIBRO',
      recurso: 'libro',
      recurso_id: crearLibro._id,
      descripcion: `El ${actor?.nombre} ${actor?.apellido} creó el libro "${crearLibro.titulo}" (rol: ${actor?.rol})`
    }).subscribe({
      next: () => console.log('Log de creación de libro registrado'),
      error: (err) => console.error('Error al registrar log', err)
    });
  }

  private logsActualizarLibros(actualizarLibro: Libros): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_LIBRO',
      recurso: 'libro',
      recurso_id: actualizarLibro._id,
      descripcion: `El ${actor?.nombre} ${actor?.apellido} actualizo el libro "${actualizarLibro.titulo}" (rol: ${actor?.rol})`
    }).subscribe({
      next: () => console.log('Log de actualizacion de libro registrado'),
      error: (err) => console.error('Error al actualizar log', err)
    });
  }
}
