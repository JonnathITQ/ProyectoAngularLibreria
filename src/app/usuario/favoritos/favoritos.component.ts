import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { LibrosService } from '../../services/libros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
  providers: [UsuarioService, LibrosService]
})
export class FavoritosComponent implements OnInit {
  public identity: any;
  public usuario: any;
  public librosFavoritos: any[] = [];
  public todosLibros: Libros[] = [];
  public url: string;
  public showModal: boolean = false;

  // New property for selected book in dropdown
  public libroSeleccionado: any = null;

  constructor(
    private _usuarioService: UsuarioService,
    private _librosService: LibrosService
  ) {
    this.identity = this._usuarioService.getUsuario();
    this.url = urlMongo.url;
  }

  ngOnInit(): void {
    if (this.identity) {
      this.obtenerUsuario();
      this.obtenerLibros();
    }
  }

  obtenerUsuario() {
    this._usuarioService.verUsuario(this.identity._id).subscribe(
      response => {
        this.usuario = response.usuario;
        this.librosFavoritos = this.usuario.libros_favorito || [];
        this.procesarImagenes(this.librosFavoritos);
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerLibros() {
    this._librosService.verLibros().subscribe(
      response => {
        if (response.libro) {
          this.todosLibros = response.libro;
          this.procesarImagenes(this.todosLibros);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  procesarImagenes(libros: any[]) {
    libros.forEach(libro => {
      if (libro.portada && !libro.portada.startsWith('http')) {
        libro.portada = this.url + 'tener-portada/' + libro.portada;
      } else if (!libro.portada) {
        libro.portada = 'assets/img/no-image.png';
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.libroSeleccionado = null;
    }
  }

  onLibroSelect() {
    // Logic when a book is selected from dropdown (optional, mostly for UI updates)
  }

  esFavorito(libro: any): boolean {
    if (!libro) return false;
    return this.librosFavoritos.some(f => f._id === libro._id);
  }

  toggleFavorito(libro: any) {
    if (this.esFavorito(libro)) {
      this.librosFavoritos = this.librosFavoritos.filter(f => f._id !== libro._id);
    } else {
      this.librosFavoritos.push(libro);
    }
  }

  eliminarFavorito(libro: any) {
    this.librosFavoritos = this.librosFavoritos.filter(l => l._id !== libro._id);
    this.actualizarUsuario();
  }

  guardarCambios() {
    this.actualizarUsuario();
    this.toggleModal();
  }

  actualizarUsuario() {
    const idsFavoritos = this.librosFavoritos.map(l => l._id);
    const usuarioActualizado = { ...this.usuario, libros_favorito: idsFavoritos };

    // Remove password to avoid hashing it again or sending empty
    delete usuarioActualizado.contrasenia;

    this._usuarioService.actualizarUsuario(usuarioActualizado).subscribe(
      response => {
        console.log('Favoritos actualizados');
      },
      error => {
        console.log(error);
      }
    );
  }
}
