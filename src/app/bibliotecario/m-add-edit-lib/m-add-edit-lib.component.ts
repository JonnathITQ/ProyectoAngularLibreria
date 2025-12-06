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
  public libro: Libros;// Modelo del Libros
  public status: string = "";// Estado(success / failed)
  public libroOriginal: Libros | null = null;// Guarda temporalmente el libro original cuando se está editando
  public archivoSeleccionado: File | null = null;// Imagen seleccionada del input file
  public url: string = urlMongo.url;//URL base

  // Evento que emite al padre cuando se crea o actualiza un libro
  @Output() libroGuardado = new EventEmitter<void>();

  constructor(
    private _librosService: LibrosService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    // Se inicializa el objeto libro vacío
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
  }
  // Obtiene el empleado que está realizando la acción (para logs)
  private getActor() {
    return this._empleadoService.getEmpleado();
  }
  // Guarda el archivo seleccionado del input type="file"
  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }
  //1) Registrar Libro
  registrarLibro(form: any) {
    // Primero guarda el libro sin la imagen
    this._librosService.guardarLibros(this.libro).subscribe(
      response => {
        if (response.libro) {
          const libroId = response.libro._id;
          // Si también se subirá imagen
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
            // Si no hay imagen, finaliza de inmediato
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

  // Termina el proceso de crear libro
  finalizarRegistro(form: any, libroCreado: Libros) {
    this.status = 'success';
    this.logsCrearLibros(libroCreado);// Registrar log de acción
    this.libroGuardado.emit();// Notificar al componente padre que el libro fue guardado
    this.resetForm(form);// Resetear formulario
    this.cerrarModal();// Cerrar el modal
  }

  //segundo: Actualizar libro
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

  // Termina actualización
  finalizarActualizacion(libroActualizado: Libros) {
    this.status = 'success';
    this.logsActualizarLibros(libroActualizado); // Log de edición
    this.libroGuardado.emit();// Notifica al padre
    // Limpieza
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
    this.libroOriginal = null;
    this.archivoSeleccionado = null;
    //Cierra el modal
    this.cerrarModal();
  }
  // Cargar libro seleccionado al formulario
  seleccionarLibro(libro: Libros) {
    this.libro = { ...libro };// Copia editable
    this.libroOriginal = { ...libro };// Copia original
    this.archivoSeleccionado = null;
  }

  // Resetea el formulario y variables
  resetForm(form?: any) {
    if (form) {
      form.reset();
    }
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
    this.libroOriginal = null;
    this.archivoSeleccionado = null;
  }
  // Cierra modal presionando botón "close"
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

  // Registrar log de creación
  private logsActualizarLibros(actualizarLibro: Libros): void {
    var actor = this.getActor();
    this._logsService.crearLogs({
      actor_id: actor?._id,
      actor_tipo: 'Empleados',
      accion: 'EDITAR_LIBRO',
      recurso: 'libro',
      recurso_id: actualizarLibro._id,
      //El $ hace que sea un template string para poder interpolar
      // ${actor?.nombre} = toma el nombre del actor, si existe.
      // ${actor?.apellido} = su apellido.
      // ${actualizarLibro.titulo} = título del libro actualizado.
      // ${actor?.rol} = rol del usuario que hizo la acción.
      descripcion: `El ${actor?.nombre} ${actor?.apellido} actualizo el libro "${actualizarLibro.titulo}" (rol: ${actor?.rol})`
    }).subscribe({
      next: () => console.log('Log de actualizacion de libro registrado'),
      error: (err) => console.error('Error al actualizar log', err)
    });
  }
}
