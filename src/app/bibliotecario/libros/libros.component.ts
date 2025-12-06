import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LibrosService } from '../../services/libros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-libros',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css',
  providers: [LibrosService, EmpleadoService, LogsService],
  standalone: true
})
export class LibrosComponent implements OnInit {
  public listaLibros: Libros[] = [];
  public libro: Libros;
  public status: string = "";
  public libroOriginal: Libros | null = null;
  public idLibroAEliminar: String | null = null;
  public archivoSeleccionado: File | null = null;
  public url: string = urlMongo.url;
  public page: number = 1;
  public pageSize: number = 5;
  public Math = Math;

  constructor(
    private _librosService: LibrosService,
    private _logsService: LogsService,
    private _empleadoService: EmpleadoService
  ) {
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
  }

  ngOnInit(): void {
    this.obtenerLibros();
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
                this.finalizarRegistro(form);
              },
              error => {
                console.log(error);
                this.status = 'failed';
              }
            );
          } else {
            this.finalizarRegistro(form);
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

  finalizarRegistro(form: any) {
    this.status = 'success';
    this.obtenerLibros();
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
                this.finalizarActualizacion();
              },
              error => {
                console.log(error);
              }
            )
          } else {
            this.finalizarActualizacion();
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

  finalizarActualizacion() {
    this.status = 'success';
    this.obtenerLibros();
    this.libro = new Libros('', '', '', '', '', 0, '', 0, '', '');
    this.libroOriginal = null;
    this.archivoSeleccionado = null;
    this.cerrarModal();
  }

  prepararEliminacion(id: String) {
    this.idLibroAEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idLibroAEliminar) {
      this._librosService.deleteLibro(this.idLibroAEliminar).subscribe(
        response => {
          this.obtenerLibros();
          this.idLibroAEliminar = null;
          this.cerrarModalEliminar();
        },
        error => {
          console.log(error);
        }
      );
    }
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

  cerrarModalEliminar() {
    const btnCerrar = document.getElementById('closeDeleteModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }

  //Metodos
  private logsCrearLibros(crearLibro: Libros): void {
    //Use de this para obtener una instancia del un servico, en este caso el servico de logs XD
    //lo mismo con el actor pero este es un poco distinto proque creamos la variable para obtener el dato que se obtuvo del metodo getActor
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


  private logsEliminarLibros(libroEliminar: Libros): void {
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

