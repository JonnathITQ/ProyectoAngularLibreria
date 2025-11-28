import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  public listaUsuarios: Usuarios[] = [];
  public usuario: Usuarios;
  public status: string = "";
  public usuarioOriginal: Usuarios | null = null;
  public idUsuarioAEliminar: String | null = null;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario = new Usuarios('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.verUsuarios().subscribe(response => {
      this.listaUsuarios = response.usuario;
      console.log('Usuarios Cargados:', this.listaUsuarios);
    },
      error => {
        console.log('Error al cargar usuarios', error);
      }
    );
  }

  registrarUsuario(form: any) {
    this.usuarioService.guardarUsuarios(this.usuario).subscribe(
      response => {
        if (response.usuario) {
          this.status = 'success';
          this.obtenerUsuarios();
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
    // Check if changes were made
    if (JSON.stringify(this.usuario) === JSON.stringify(this.usuarioOriginal)) {
      console.error("Debes modificar algo para guardar");
      return;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      response => {
        if (response.usuario) {
          this.status = 'success';
          this.obtenerUsuarios();
          this.usuario = new Usuarios('', '', '', '', '', '', ''); // Reset object
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

  prepararEliminacion(id: String) {
    this.idUsuarioAEliminar = id;
  }

  confirmarEliminacion() {
    if (this.idUsuarioAEliminar) {
      this.usuarioService.deleteUsuario(this.idUsuarioAEliminar).subscribe(
        response => {
          this.obtenerUsuarios();
          this.idUsuarioAEliminar = null;
          this.cerrarModalEliminar();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  seleccionarUsuario(usuario: Usuarios) {
    this.usuario = { ...usuario }; // Create a copy
    this.usuarioOriginal = { ...usuario }; // Save original state
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

  cerrarModalEliminar() {
    const btnCerrar = document.getElementById('closeDeleteModalBtn');
    if (btnCerrar) {
      btnCerrar.click();
    }
  }
}
