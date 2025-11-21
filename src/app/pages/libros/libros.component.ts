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
        { titulo: 'El Bosque de los Secretos', descripcion: 'Es la tercera entrega de la saga de fantasía para jóvenes "Los Gatos Guerreros" de Erin Hunter, donde las tensiones entre clanes felinos aumentan por la escasez de comida, mientras que Corazón de Fuego investiga la misteriosa muerte de un antiguo lugarteniente.', genero: 'Accion', portada: 'assets/books/portada/El_Bosque_de_los_Secretos.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 30, autor: 'Erin Hunter', ubicacion: 'Estante B, Fila 1' },
        { titulo: 'En Territorio Salvaje', descripcion: ' Es el primer libro de la saga "Los gatos guerreros" de Erin Hunter. Narra la historia de Colorado, un gato doméstico que se une al Clan del Trueno, un grupo de gatos salvajes que luchan por sobrevivir en un bosque dividido en territorios por clanes ancestrales.', genero: 'Accion', portada: 'assets/books/portada/En_Territorio_Salvaje.jpg', anio_publicacion: 2003, idioma: 'Español', cantidad_disponible: 33, autor: 'Erin Hunter', ubicacion: 'Estante B, Fila 2' },
        { titulo: 'Fuego y Hielo', descripcion: 'Es la segunda novela de la serie "Los Gatos Guerreros", donde Corazón de Fuego, ahora un guerrero, debe proteger a su clan, ayudar al Clan del Viento a recuperar su territorio y lidiar con la amenaza de un traidor dentro de su propio clan.', genero: 'Accion', portada: 'assets/books/portada/Fuego_y_Hielo.jpg', anio_publicacion: 2012, idioma: 'Español', cantidad_disponible: 10, autor: 'Erin Hunter', ubicacion: 'Estante B, Fila 3' },
        { titulo: 'Harry Potter y la Piedra Filosofal', descripcion: 'Narra la historia de Harry Potter, un joven mago que descubre su herencia mágica en su undécimo cumpleaños cuando recibe una carta de aceptación para el Colegio Hogwarts de Magia y Hechicería.', genero: 'Accion', portada: 'assets/books/portada/Harry_Potter_y_la_Piedra_Filosofal.jpg', anio_publicacion: 1997, idioma: 'Español', cantidad_disponible: 4, autor: 'J.K. Rowling', ubicacion: 'Estante B, Fila 4' },
        { titulo: 'Los Juegos del Hambre', descripcion: 'Son una competición anual en la distópica nación de Panem, donde cada año se seleccionan forzosamente dos jóvenes (un chico y una chica) de cada uno de los 12 distritos para luchar a muerte en una arena televisada.', genero: 'Accion', portada: 'assets/books/portada/Los_Juegos_del_Hambre.jpg', anio_publicacion: 2008, idioma: 'Español', cantidad_disponible: 10, autor: 'Suzanne Collins', ubicacion: 'Estante B, Fila 5' },
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
