import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BurguerComponent } from "../burguer/burguer.component";

@Component({
  selector: 'app-favoritos',
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule, BurguerComponent],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  librosFavoritos: any[] = [];
  cargando: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.cargando = true;
    this.usuarioService.getFavoritos().subscribe(
      (data) => {
        this.librosFavoritos = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al cargar favoritos', error);
        this.cargando = false;
        // Considerar mostrar un mensaje de error al usuario
      }
    );
  }

  quitarDeFavoritos(libroId: string) {
    if (confirm('¿Estás seguro de que quieres quitar este libro de tus favoritos?')) {
      this.usuarioService.toggleFavorito(libroId).subscribe(
        () => {
          // Si la operación es exitosa, actualiza la lista localmente
          this.librosFavoritos = this.librosFavoritos.filter(libro => libro._id !== libroId);
        },
        (error) => {
          console.error('Error al quitar de favoritos', error);
          alert('No se pudo quitar de favoritos. Inténtalo de nuevo.');
        }
      );
    }
  }

  verDetalle(libroId: string) {
    // Navegar al componente de detalle del libro
    this.router.navigate(['/usuario/libros', libroId]);
  }
}
