import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para leer el ID de la URL
import { Libros } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { UsuarioService } from '../../../services/user.service';
import { BurguerComponent } from '../burguer/burguer.component'; 
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [HttpClientModule ,BurguerComponent, CommonModule],
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  libroId: String | null = null;
  libro: Libros | null = null;
  usuarioId: String | null = null;
  esFavorito: boolean = false;
  mensaje: string = '';

  constructor(
    private _route: ActivatedRoute, // Para obtener parámetros de la URL
    private _libroService: LibrosService,
    private _usuarioService: UsuarioService 
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario logueado (necesario para favoritos)
    const usuarioLogueado = this._usuarioService.getUsuario();
    if (usuarioLogueado && usuarioLogueado._id) {
        this.usuarioId = usuarioLogueado._id;
    }

    // Obtener el ID del libro de la URL
    this._route.params.subscribe(params => {
      this.libroId = params['id'];
      if (this.libroId) {
        this.cargarDetalleLibro(this.libroId);
      }
    });
  }

  cargarDetalleLibro(id: String): void {
    this._libroService.verLibro(id).subscribe({
      next: (response) => {
        if (response.libro) {
          this.libro = response.libro;
          this.verificarFavorito();
        } else {
          this.mensaje = 'Libro no encontrado.';
        }
      },
      error: (err) => {
        this.mensaje = 'Error al cargar los detalles del libro.';
        console.error(err);
      }
    });
  }


  // Verifica si el libro actual está en la lista de favoritos del usuario.

  verificarFavorito(): void {
    if (this.usuarioId && this.libroId) {
      this._usuarioService.verUsuario(this.usuarioId).subscribe(userResponse => {
        const favoritos = userResponse.usuario.favoritos || []; 
        this.esFavorito = favoritos.includes(this.libroId);
      });
    }
  }

  gestionarFavorito(): void {
    if (!this.usuarioId || !this.libroId) {
      this.mensaje = 'ERROR: Debe iniciar sesión para gestionar favoritos.';
      return;
    }
    
    this._libroService.gestionarFavorito(this.usuarioId, this.libroId).subscribe({
      next: (response) => {
        this.esFavorito = response.added; 
        this.mensaje = response.message;
      },
      error: (err) => {
        this.mensaje = 'Error al procesar la solicitud de favoritos.';
        console.error(err);
      }
    });
  }
  


  // Función simulada. En un proyecto real, esto redirige a un visor PDF o similar.
  empezarALeer(): void {
    alert(`Redirigiendo a la lectura de: ${this.libro?.titulo}`);
    // Aquí iría la lógica de routing para el visor de libros
  }
}