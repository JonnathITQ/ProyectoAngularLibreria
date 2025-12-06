import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { LibrosService } from '../../services/libros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { CarouselFavoritosComponent } from '../carousel-favoritos/carousel-favoritos.component';
import { ModalSeleccionComponent } from '../modal-seleccion/modal-seleccion.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, CarouselFavoritosComponent, ModalSeleccionComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
  providers: [UsuarioService, LibrosService]
})
export class FavoritosComponent implements OnInit {
  public identity: any;// Datos del usuario logueado desde localStorage
  public usuario: any;// Datos completos del usuario desde BD
  public librosFavoritos: any[] = [];// Libros favoritos del usuario
  public todosLibros: Libros[] = [];// Todos los libros disponibles
  public url: string;// URL base
  public showModal: boolean = false;// Control de visibilidad del modal

  constructor(
    private _usuarioService: UsuarioService,
    private _librosService: LibrosService
  ) {
    // Obtiene la identidad local del usuario
    this.identity = this._usuarioService.getUsuario();
    // Asigna la URL del backend
    this.url = urlMongo.url;
  }

  // Solo carga datos si hay un usuario logueado
  ngOnInit(): void {
    if (this.identity) {
      this.obtenerUsuario();
      this.obtenerLibros();
    }
  }
  // Obtiene los datos completos del usuario desde el backend
  obtenerUsuario() {
    this._usuarioService.verUsuario(this.identity._id).subscribe(
      response => {
        this.usuario = response.usuario;// Usuario completo
        this.librosFavoritos = this.usuario.libros_favorito || [];// Favoritos
        this.procesarImagenes(this.librosFavoritos);// Adjunta rutas completas de imágenes
      },
      error => {
        console.log(error); //En caso que haya un error
      }
    );
  }
  // Obtiene todos los libros de la base de datos
  obtenerLibros() {
    this._librosService.verLibros().subscribe(
      response => {
        if (response.libro) {
          this.todosLibros = response.libro;// Guarda todos los libros
          this.procesarImagenes(this.todosLibros);// Ajusta portadas
        }
      },
      error => {
        console.log(error); //Error
      }
    );
  }
  // Procesa imágenes para generar la ruta completa del backend
  procesarImagenes(libros: any[]) {
    libros.forEach(libro => {
      // Si la portada existe pero no es una URL completa, se arma con el backend
      if (libro.portada && !libro.portada.startsWith('http')) {
        libro.portada = this.url + 'tener-portada/' + libro.portada;
        // Si no tiene portada, usa imagen por defecto
      } else if (!libro.portada) {
        libro.portada = 'assets/img/no-image.png';
      }
    });
  }

  // Alterna la visibilidad del modal
  toggleModal() {
    this.showModal = !this.showModal;
  }

  // Elimina un libro de favoritos
  eliminarFavorito(libro: any) {
    // Filtra la lista de favoritos para mantener solo los libros cuyo ID
    // sea diferente al del libro que se quiere eliminar.
    // es decir elimina el libro seleccionado de la lista.
    this.librosFavoritos = this.librosFavoritos.filter(l => l._id !== libro._id);
    this.actualizarUsuario();
  }

  guardarCambios() {
    this.actualizarUsuario();
    this.toggleModal();
  }

  actualizarUsuario() {
    // Crea un nuevo arreglo que contiene solo los _id de cada libro favorito.
    // Me refiero a que este convierte la lista de objetos "libro" en una lista de IDs.
    const idsFavoritos = this.librosFavoritos.map(l => l._id);
    const usuarioActualizado = { ...this.usuario, libros_favorito: idsFavoritos };

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
