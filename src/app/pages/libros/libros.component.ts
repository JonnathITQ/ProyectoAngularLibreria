import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  portada: string;
  link: string;
  descripcion?: string;
  genero?: string;
  anio?: number;
  idioma?: string;
  ubicacion?: { estante: string; fila: number };
}

@Component({
  selector: 'app-libros',
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  genres: { name: string; books: Book[] }[] = [
    {
      name: 'Romance',
      books: [
        { id: 1, titulo: 'Boulevard', autor: 'Flor Salvador', portada: 'assets/books/portada/Boulevard.jpg', link: 'assets/books/Boulevard-Flor-Salvador.pdf', descripcion: 'Historia de amor y recuperación entre dos jóvenes en el café Boulevard.', genero: 'Romance', anio: 2020, idioma: 'Español', ubicacion: { estante: 'Romance A', fila: 2 } },
        { id: 2, titulo: 'El Orden de las Cosas', autor: 'Ivan Thays', portada: 'assets/books/portada/OrdenCosas.jpg', link: 'assets/books/El-Orden-de-las-Cosas-Ivan-Thays.pdf', descripcion: 'Relato íntimo sobre memoria, vínculos y el orden que damos a la vida.', genero: 'Romance', anio: 2000, idioma: 'Español', ubicacion: { estante: 'Romance A', fila: 3 } },
        { id: 3, titulo: 'El Silencio', autor: 'Flor Salvador', portada: 'assets/books/portada/Silencio.png', link: 'assets/books/El-Silencio-Flor-Salvador.pdf', descripcion: 'Historia de pérdida y redención que acompaña el universo de Boulevard.', genero: 'Romance', anio: 2021, idioma: 'Español', ubicacion: { estante: 'Romance A', fila: 4 } },
        { id: 4, titulo: 'Orgullo y Prejuicio', autor: 'Jane Austen', portada: 'assets/books/portada/OrgulloPrejuicio.jpeg', link: 'assets/books/Orgullo-y-Prejuicio-Jane-Austen.pdf', descripcion: 'Clásico sobre las relaciones, clase social y el amor en la Inglaterra georgiana.', genero: 'Romance', anio: 1813, idioma: 'Español (Traducción)', ubicacion: { estante: 'Clásicos B', fila: 4 } },
        { id: 5, titulo: 'Somebody to Love', autor: 'Jonnath Suárez', portada: 'assets/books/portada/Somebody.png', link: 'assets/books/Somebody-to-Love-Jonnath-Suárez.pdf', descripcion: 'Romance contemporáneo sobre segundas oportunidades.', genero: 'Romance', anio: 2024, idioma: 'Español', ubicacion: { estante: 'Romance B', fila: 1 } },
        { id: 6, titulo: 'Noches Blancas', autor: 'Fedor Dostoiewski', portada: 'assets/books/portada/NochesBlancas.png', link: 'assets/books/Noches-Blancas-Fedor-Dostoiewski.pdf', descripcion: 'Novela corta sobre soledad y sueños en San Petersburgo.', genero: 'Romance', anio: 1848, idioma: 'Español (Traducción)', ubicacion: { estante: 'Clásicos B', fila: 1 } }
      ]
    },
    {
      name: 'Acción',
      books: [
        { id: 7, titulo: 'El código Da Vinci', autor: 'Dan Brown', portada: 'https://picsum.photos/seed/accion1/300/420', link: '/libros/accion/el-codigo-da-vinci' },
        { id: 8, titulo: 'Ángeles y demonios', autor: 'Dan Brown', portada: 'https://picsum.photos/seed/accion2/300/420', link: '/libros/accion/angeles-y-demonios' },
        { id: 9, titulo: 'Los juegos del hambre', autor: 'Suzanne Collins', portada: 'https://picsum.photos/seed/accion3/300/420', link: '/libros/accion/los-juegos-del-hambre' },
        { id: 10, titulo: 'En llamas', autor: 'Suzanne Collins', portada: 'https://picsum.photos/seed/accion4/300/420', link: '/libros/accion/en-llamas' },
        { id: 11, titulo: 'Sinsajo', autor: 'Suzanne Collins', portada: 'https://picsum.photos/seed/accion5/300/420', link: '/libros/accion/sinsajo' },
        { id: 12, titulo: 'Inferno', autor: 'Dan Brown', portada: 'https://picsum.photos/seed/accion6/300/420', link: '/libros/accion/inferno' }
      ]
    },
    {
      name: 'Programación',
      books: [
        { id: 13, titulo: 'Clean Code', autor: 'Robert C. Martin', portada: 'https://picsum.photos/seed/prog1/300/420', link: '/libros/programacion/clean-code' },
        { id: 14, titulo: 'The Pragmatic Programmer', autor: 'Andrew Hunt y David Thomas', portada: 'https://picsum.photos/seed/prog2/300/420', link: '/libros/programacion/the-pragmatic-programmer' },
        { id: 15, titulo: 'Design Patterns', autor: 'GoF', portada: 'https://picsum.photos/seed/prog3/300/420', link: '/libros/programacion/design-patterns' },
        { id: 16, titulo: 'Refactoring', autor: 'Martin Fowler', portada: 'https://picsum.photos/seed/prog4/300/420', link: '/libros/programacion/refactoring' },
        { id: 17, titulo: 'Eloquent JavaScript', autor: 'Marijn Haverbeke', portada: 'https://picsum.photos/seed/prog5/300/420', link: '/libros/programacion/eloquent-javascript' },
        { id: 18, titulo: "You Don't Know JS", autor: 'Kyle Simpson', portada: 'https://picsum.photos/seed/prog6/300/420', link: '/libros/programacion/you-dont-know-js' }
      ]
    },
    {
      name: 'Filosofía',
      books: [
        { id: 19, titulo: 'La república', autor: 'Platón', portada: 'https://picsum.photos/seed/filo1/300/420', link: '/libros/filosofia/la-republica' },
        { id: 20, titulo: 'Meditaciones', autor: 'Marco Aurelio', portada: 'https://picsum.photos/seed/filo2/300/420', link: '/libros/filosofia/meditaciones' },
        { id: 21, titulo: 'Así habló Zaratustra', autor: 'F. Nietzsche', portada: 'https://picsum.photos/seed/filo3/300/420', link: '/libros/filosofia/asi-hablo-zaratustra' },
        { id: 22, titulo: 'Crítica de la razón pura', autor: 'I. Kant', portada: 'https://picsum.photos/seed/filo4/300/420', link: '/libros/filosofia/critica-de-la-razon-pura' },
        { id: 23, titulo: 'El mundo de Sofía', autor: 'J. Gaarder', portada: 'https://picsum.photos/seed/filo5/300/420', link: '/libros/filosofia/el-mundo-de-sofia' },
        { id: 24, titulo: 'La genealogía de la moral', autor: 'F. Nietzsche', portada: 'https://picsum.photos/seed/filo6/300/420', link: '/libros/filosofia/la-genealogia-de-la-moral' }
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
