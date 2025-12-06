import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../models/usuarios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MAddEditUsComponent } from '../m-add-edit-us/m-add-edit-us.component';
import { MDeleteUsComponent } from '../m-delete-us/m-delete-us.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, MAddEditUsComponent, MDeleteUsComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  public listaUsuarios: Usuarios[] = [];

  @ViewChild(MAddEditUsComponent) mAddEditUs!: MAddEditUsComponent;
  @ViewChild(MDeleteUsComponent) mDeleteUs!: MDeleteUsComponent;

  constructor(
    private usuarioService: UsuarioService
  ) { }

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

  abrirModalNuevo() {
    this.mAddEditUs.resetForm();
  }

  abrirModalEditar(usuario: Usuarios) {
    this.mAddEditUs.seleccionarUsuario(usuario);
  }

  abrirModalEliminar(id: String, usuario: Usuarios) {
    this.mDeleteUs.prepararEliminacion(id, usuario);
  }
}
