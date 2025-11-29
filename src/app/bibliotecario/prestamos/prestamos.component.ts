import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../models/prestamos';
import { PrestamosService } from '../../services/prestamos.service';
import { LibrosService } from '../../services/libros.service';
import { UsuarioService } from '../../services/usuario.service';
import { Libros } from '../../models/libros';
import { Usuarios } from '../../models/usuarios';

@Component({
  selector: 'app-prestamos',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css',
  providers: [PrestamosService, LibrosService, UsuarioService],
  standalone: true
})
export class PrestamosComponent implements OnInit {
  public listaPrestamos: Prestamos[] = [];
  public listaLibros: Libros[] = [];
  public listaUsuarios: Usuarios[] = [];
  public prestamo: Prestamos;
  public status: string = "";
  public idPrestamoAEliminar: String | null = null;

  constructor(
    private _prestamosService: PrestamosService,
    private _librosService: LibrosService,
    private _usuarioService: UsuarioService
  ) {
    this.prestamo = new Prestamos('', '', '', '', 0, false);
  }

  ngOnInit(): void {
    this.obtenerPrestamos();
    this.obtenerLibros();
    this.obtenerUsuarios();
  }

  obtenerPrestamos() {
    this._prestamosService.verPrestamos().subscribe(
      response => {
        this.listaPrestamos = response.prestamo;
      },
      error => {
        console.log(error);
      }
    );
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
          this.obtenerPrestamos();
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
          this.obtenerPrestamos();
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

  prepararEliminacion(id: String) {
    this.idPrestamoAEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idPrestamoAEliminar) {
      this._prestamosService.borrarPrestamo(this.idPrestamoAEliminar).subscribe(
        response => {
          this.obtenerPrestamos();
          this.idPrestamoAEliminar = null;
          this.cerrarModalEliminar();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  seleccionarPrestamo(prestamo: Prestamos) {
    // Clone the object to avoid modifying the list directly
    this.prestamo = { ...prestamo };

    // Ensure IDs are set correctly for the select elements
    // When populated, these are objects, but for the select we might need the ID string if the value is bound to the ID
    // However, if we bind [ngValue]="usuario", we need the object.
    // Let's assume we bind to the ID in the HTML: [value]="usuario._id"
    if (typeof this.prestamo.usuario_id === 'object' && this.prestamo.usuario_id !== null) {
      this.prestamo.usuario_id = this.prestamo.usuario_id._id;
    }
    if (typeof this.prestamo.libros_id === 'object' && this.prestamo.libros_id !== null) {
      this.prestamo.libros_id = this.prestamo.libros_id._id;
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

  cerrarModalEliminar() {
    const btnCerrar = document.getElementById('closeDeleteModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }
}
