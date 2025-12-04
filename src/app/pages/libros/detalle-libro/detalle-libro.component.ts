import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { UsuarioService } from '../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BurguerComponent } from "../../../usuario/usercomponents/burguer/burguer.component";

@Component({
  selector: 'app-detalle-libro',
  imports: [ReactiveFormsModule, CommonModule, BurguerComponent],
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  // Variables de estado del componente (corregidas)
  libro: any = {};
  libroId: string = '';
  esFavorito: boolean = false;
  cargando: boolean = true;
  errorCarga: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private librosService: LibrosService,
    private usuarioService: UsuarioService // Inyectar el servicio de usuario
  ) { }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la URL para obtener el ID
    this.route.params.subscribe(params => {
      this.libroId = params['id'];
      if (this.libroId) {
        this.cargarDetalleLibro(this.libroId);
      } else {
        this.cargando = false;
        this.errorCarga = true;
        console.error('ID de libro no proporcionado en la URL.');
      }
    });
  }

  cargarDetalleLibro(id: string) {
    this.cargando = true;
    this.errorCarga = false;

    this.librosService.verLibro(id).subscribe(
      (response: any) => {
        // Verificar si la respuesta contiene una propiedad 'libro' (típico en Node/Express)
        if (response && response.libro) {
            this.libro = response.libro; // Asigna el objeto libro
        } else {
            // Si el backend envía el libro directamente sin envolver, usa response.
            this.libro = response;
        }

        // 2. Verificar el estado de favorito después de cargar el libro
        this.verificarSiEsFavorito(this.libroId);
      },
      (error) => {
        console.error('Error al cargar detalle del libro', error);
        this.cargando = false;
        this.errorCarga = true;
      }
    );
  }

  verificarSiEsFavorito(id: string) {
    this.usuarioService.getFavoritos().subscribe(
      (favoritos: any[]) => {
        // Compara el ID del libro actual con los IDs en el array de favoritos
        this.esFavorito = favoritos.some(fav => fav._id === id);
        this.cargando = false;
      },
      (error) => {
        // En caso de error (ej: usuario no logueado), asumimos que no es favorito
        console.error('Error al verificar favorito (puede que no esté logueado)', error);
        this.esFavorito = false;
        this.cargando = false;
      }
    );
  }

  toggleFavorito() {
    this.usuarioService.toggleFavorito(this.libroId).subscribe(
      (response) => {
        // Actualiza el estado basado en la respuesta del backend
        this.esFavorito = response.isFavorite;
        alert(response.message);
      },
      (error) => {
        console.error('Error al alternar favorito', error);
        alert('Hubo un error al guardar tu favorito. ¿Estás seguro de que tienes sesión iniciada?');
      }
    );
  }

  // Función para abrir el PDF (se debe ajustar la ruta base de tus archivos estáticos)
  abrirPDF() {
    // Ejemplo: Asumiendo que tus PDFs están bajo /uploads/
    const pdfUrl = `RUTA_BASE_DEL_BACKEND/uploads/${this.libro.ruta_pdf}`;
    window.open(pdfUrl, '_blank');
  }
}
