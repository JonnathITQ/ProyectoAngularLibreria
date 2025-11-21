import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Book {
  titulo: string,
  descripcion: string,
  genero: string,
  portada: string,
  anio_publicacion: number,
  idioma: string,
  cantidad_disponible: number,
  autor: string,
  ubicacion: string
}

@Component({
  selector: 'app-libros',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  generos: { titulo: string; libros: Book[] }[] = [
    {
      titulo: 'Romance',
      libros: [

        { titulo: 'El Orden de las Cosas', descripcion: 'Una obra llena amor, deporte y de inesperadas confesiones. En medio de una competencia de fútbol y del primer amor, el protagonista debe sobrellevar la sorpresiva confesión de su mejor amigo, quien le había mostrado que la mejor manera de lograr sus sueños era siguiendo un orden', genero: 'Romance', portada: 'assets/books/portada/OrdenCosas.jpg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 20, autor: 'Ivan Thays', ubicacion: 'Estante A, Fila 1' },
        { titulo: 'Boulevard', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Boulevard.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 33, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 2' },
        { titulo: 'El Silencio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Silencio.png', anio_publicacion: 2014, idioma: 'Español', cantidad_disponible: 10, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 3' },
        { titulo: 'Noches Blancas', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/NochesBlancas.png', anio_publicacion: 1990, idioma: 'Español', cantidad_disponible: 4, autor: 'Fedor Dostoiewski', ubicacion: 'Estante A, Fila 4' },
        { titulo: 'Orgullo y Prejuicio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/OrgulloPrejuicio.jpeg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 10, autor: 'Jane Austen', ubicacion: 'Estante A, Fila 5' },
        { titulo: 'Somebody to Love', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Somebody.png', anio_publicacion: 2015, idioma: 'Español', cantidad_disponible: 2, autor: 'J.R.R. Tolkien', ubicacion: 'Estante A, Fila 6' },
      ]
    },
    {
      titulo: 'Acción',
      libros: [
        { titulo: 'El Orden de las Cosas', descripcion: 'Una obra llena amor, deporte y de inesperadas confesiones. En medio de una competencia de fútbol y del primer amor, el protagonista debe sobrellevar la sorpresiva confesión de su mejor amigo, quien le había mostrado que la mejor manera de lograr sus sueños era siguiendo un orden', genero: 'Romance', portada: 'assets/books/portada/OrdenCosas.jpg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 20, autor: 'Ivan Thays', ubicacion: 'Estante A, Fila 1' },
        { titulo: 'Boulevard', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Boulevard.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 33, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 2' },
        { titulo: 'El Silencio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Silencio.png', anio_publicacion: 2014, idioma: 'Español', cantidad_disponible: 10, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 3' },
        { titulo: 'Noches Blancas', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/NochesBlancas.png', anio_publicacion: 1990, idioma: 'Español', cantidad_disponible: 4, autor: 'Fedor Dostoiewski', ubicacion: 'Estante A, Fila 4' },
        { titulo: 'Orgullo y Prejuicio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/OrgulloPrejuicio.jpeg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 10, autor: 'Jane Austen', ubicacion: 'Estante A, Fila 5' },
        { titulo: 'Somebody to Love', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Somebody.png', anio_publicacion: 2015, idioma: 'Español', cantidad_disponible: 2, autor: 'J.R.R. Tolkien', ubicacion: 'Estante A, Fila 6' },
      ]
    },
    {
      titulo: 'Programación',
      libros: [
        { titulo: 'El Orden de las Cosas', descripcion: 'Una obra llena amor, deporte y de inesperadas confesiones. En medio de una competencia de fútbol y del primer amor, el protagonista debe sobrellevar la sorpresiva confesión de su mejor amigo, quien le había mostrado que la mejor manera de lograr sus sueños era siguiendo un orden', genero: 'Romance', portada: 'assets/books/portada/OrdenCosas.jpg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 20, autor: 'Ivan Thays', ubicacion: 'Estante A, Fila 1' },
        { titulo: 'Boulevard', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Boulevard.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 33, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 2' },
        { titulo: 'El Silencio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Silencio.png', anio_publicacion: 2014, idioma: 'Español', cantidad_disponible: 10, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 3' },
        { titulo: 'Noches Blancas', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/NochesBlancas.png', anio_publicacion: 1990, idioma: 'Español', cantidad_disponible: 4, autor: 'Fedor Dostoiewski', ubicacion: 'Estante A, Fila 4' },
        { titulo: 'Orgullo y Prejuicio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/OrgulloPrejuicio.jpeg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 10, autor: 'Jane Austen', ubicacion: 'Estante A, Fila 5' },
        { titulo: 'Somebody to Love', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Somebody.png', anio_publicacion: 2015, idioma: 'Español', cantidad_disponible: 2, autor: 'J.R.R. Tolkien', ubicacion: 'Estante A, Fila 6' },
      ]
    },
    {
      titulo: 'Filosofía',
      libros: [
        { titulo: 'El Orden de las Cosas', descripcion: 'Una obra llena amor, deporte y de inesperadas confesiones. En medio de una competencia de fútbol y del primer amor, el protagonista debe sobrellevar la sorpresiva confesión de su mejor amigo, quien le había mostrado que la mejor manera de lograr sus sueños era siguiendo un orden', genero: 'Romance', portada: 'assets/books/portada/OrdenCosas.jpg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 20, autor: 'Ivan Thays', ubicacion: 'Estante A, Fila 1' },
        { titulo: 'Boulevard', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Boulevard.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 33, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 2' },
        { titulo: 'El Silencio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Silencio.png', anio_publicacion: 2014, idioma: 'Español', cantidad_disponible: 10, autor: 'Flor Salvador', ubicacion: 'Estante A, Fila 3' },
        { titulo: 'Noches Blancas', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/NochesBlancas.png', anio_publicacion: 1990, idioma: 'Español', cantidad_disponible: 4, autor: 'Fedor Dostoiewski', ubicacion: 'Estante A, Fila 4' },
        { titulo: 'Orgullo y Prejuicio', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/OrgulloPrejuicio.jpeg', anio_publicacion: 2011, idioma: 'Español', cantidad_disponible: 10, autor: 'Jane Austen', ubicacion: 'Estante A, Fila 5' },
        { titulo: 'Somebody to Love', descripcion: 'Una novela romántica que explora la complejidad de la relación entre dos personas aparentemente opuestas.', genero: 'Romance', portada: 'assets/books/portada/Somebody.png', anio_publicacion: 2015, idioma: 'Español', cantidad_disponible: 2, autor: 'J.R.R. Tolkien', ubicacion: 'Estante A, Fila 6' },
      ]
    }
  ];

  scroll(index: number, dir: 'prev' | 'next') {
    const tracks = document.querySelectorAll<HTMLDivElement>('.carousel-track');
    const el = tracks[index];
    if (!el) return;
    const delta = el.clientWidth;
    el.scrollBy({ left: dir === 'next' ? delta : -delta, behavior: 'smooth' });
  }
}
