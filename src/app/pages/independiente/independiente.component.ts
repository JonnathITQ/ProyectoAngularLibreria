import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { UsuarioService } from '../../services/usuario.service';
import { HistorialService } from '../../services/historial.service';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';

@Component({
  selector: 'app-independiente',
  standalone: true,// Este componente es standalone (no necesita módulo).
  imports: [NavbarComponent, FooterComponent, CommonModule],
  // Servicios que solo este componente usará.
  // Cada servicio aquí tiene su propia instancia privada.
  providers: [LibrosService, UsuarioService, HistorialService],
  templateUrl: './independiente.component.html',
  styleUrl: './independiente.component.css'
})
export class IndependienteComponent implements OnInit {
  public libro: Libros | null = null;// Variable que almacenará el libro recibido por ID.
  public url = urlMongo.url;// URL base del backend.

  // Inyección de dependencias
  constructor(
    private _route: ActivatedRoute,// Para obtener parámetros de la URL (ej: el ID del libro)
    private _librosService: LibrosService,// Para llamar al backend y obtener libros
    private _usuarioService: UsuarioService,// Para saber qué usuario está logeado
    private _historialService: HistorialService// Para guardar libros vistos en el historial
  ) { }

  // Se ejecuta cuando el componente ya está inicializado.
  ngOnInit(): void {
    // Escucha cambios en los parámetros de la URL.
    // Esto permite que si cambia el id en la URL, se vuelva a cargar el libro.
    this._route.params.subscribe(params => {
      // Obtiene el 'id' desde los parámetros.
      let id = params['id'];
      // Llama al método que obtiene el libro correspondiente.
      this.obtenerLibro(id);
    });
  }

  // Obtiene un libro por ID usando el servicio.
  obtenerLibro(id: string) {
    this._librosService.verLibro(id).subscribe(
      response => {
        // Si el backend devuelve el libro correctamente.
        if (response.libro) {
          // Se guarda en la variable local.
          this.libro = response.libro;
          // Si el libro tiene portada, se reconstruye la URL completa.
          if (this.libro && this.libro.portada) {
            this.libro.portada = this.url + 'tener-portada/' + this.libro.portada;
            // Si no tiene portada, se usa una imagen por defecto.
          } else if (this.libro) {
            this.libro.portada = 'assets/img/no-image.png';
          }
          // Después de mostrar el libro, se agrega al historial del usuario.
          this.agregarAHistorial(id);
        }
      },
      error => {
        // Manejo de error si falla el servicio.
        console.log(error);
      }
    );
  }

  // Agrega un libro al historial del usuario logeado.
  agregarAHistorial(libroId: string) {
    // Obtiene la identidad del usuario logeado desde el servicio.
    const identity = this._usuarioService.getUsuario();
    // Solo si el usuario está logeado y tiene ID.
    if (identity && identity._id) {
      // Llama al backend para guardar el libro visto en el historial.
      this._historialService.agregarHistorial(identity._id, libroId).subscribe(
        response => {
          console.log('Agregado al historial correctamente');
        },
        error => {
          console.log('Error al agregar al historial', error);
        }
      );
    }
  }
}
