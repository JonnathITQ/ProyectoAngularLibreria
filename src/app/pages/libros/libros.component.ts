import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';

export interface Book {
  title: string;
  author: string;
  cover: string;
  link: string;
}

@Component({
  selector: 'app-libros',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  genres: { name: string; books: Book[] }[] = [
    {
      name: 'Romance',
      books: [
        { title: 'Orgullo y prejuicio', author: 'Jane Austen', cover: 'https://picsum.photos/seed/romance1/300/420', link: '/libros/romance/orgullo-y-prejuicio' },
        { title: 'Bajo la misma estrella', author: 'John Green', cover: 'https://picsum.photos/seed/romance2/300/420', link: '/libros/romance/bajo-la-misma-estrella' },
        { title: 'El amor en los tiempos del cólera', author: 'G. García Márquez', cover: 'https://picsum.photos/seed/romance3/300/420', link: '/libros/romance/el-amor-en-los-tiempos-del-colera' },
        { title: 'Yo antes de ti', author: 'Jojo Moyes', cover: 'https://picsum.photos/seed/romance4/300/420', link: '/libros/romance/yo-antes-de-ti' },
        { title: 'Como agua para chocolate', author: 'Laura Esquivel', cover: 'https://picsum.photos/seed/romance5/300/420', link: '/libros/romance/como-agua-para-chocolate' },
        { title: 'Romeo y Julieta', author: 'W. Shakespeare', cover: 'https://picsum.photos/seed/romance6/300/420', link: '/libros/romance/romeo-y-julieta' }
      ]
    },
    {
      name: 'Acción',
      books: [
        { title: 'El código Da Vinci', author: 'Dan Brown', cover: 'https://picsum.photos/seed/accion1/300/420', link: '/libros/accion/el-codigo-da-vinci' },
        { title: 'Ángeles y demonios', author: 'Dan Brown', cover: 'https://picsum.photos/seed/accion2/300/420', link: '/libros/accion/angeles-y-demonios' },
        { title: 'Los juegos del hambre', author: 'Suzanne Collins', cover: 'https://picsum.photos/seed/accion3/300/420', link: '/libros/accion/los-juegos-del-hambre' },
        { title: 'En llamas', author: 'Suzanne Collins', cover: 'https://picsum.photos/seed/accion4/300/420', link: '/libros/accion/en-llamas' },
        { title: 'Sinsajo', author: 'Suzanne Collins', cover: 'https://picsum.photos/seed/accion5/300/420', link: '/libros/accion/sinsajo' },
        { title: 'Inferno', author: 'Dan Brown', cover: 'https://picsum.photos/seed/accion6/300/420', link: '/libros/accion/inferno' }
      ]
    },
    {
      name: 'Programación',
      books: [
        { title: 'Clean Code', author: 'Robert C. Martin', cover: 'https://picsum.photos/seed/prog1/300/420', link: '/libros/programacion/clean-code' },
        { title: 'The Pragmatic Programmer', author: 'Andrew Hunt y David Thomas', cover: 'https://picsum.photos/seed/prog2/300/420', link: '/libros/programacion/the-pragmatic-programmer' },
        { title: 'Design Patterns', author: 'GoF', cover: 'https://picsum.photos/seed/prog3/300/420', link: '/libros/programacion/design-patterns' },
        { title: 'Refactoring', author: 'Martin Fowler', cover: 'https://picsum.photos/seed/prog4/300/420', link: '/libros/programacion/refactoring' },
        { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', cover: 'https://picsum.photos/seed/prog5/300/420', link: '/libros/programacion/eloquent-javascript' },
        { title: "You Don't Know JS", author: 'Kyle Simpson', cover: 'https://picsum.photos/seed/prog6/300/420', link: '/libros/programacion/you-dont-know-js' }
      ]
    },
    {
      name: 'Filosofía',
      books: [
        { title: 'La república', author: 'Platón', cover: 'https://picsum.photos/seed/filo1/300/420', link: '/libros/filosofia/la-republica' },
        { title: 'Meditaciones', author: 'Marco Aurelio', cover: 'https://picsum.photos/seed/filo2/300/420', link: '/libros/filosofia/meditaciones' },
        { title: 'Así habló Zaratustra', author: 'F. Nietzsche', cover: 'https://picsum.photos/seed/filo3/300/420', link: '/libros/filosofia/asi-hablo-zaratustra' },
        { title: 'Crítica de la razón pura', author: 'I. Kant', cover: 'https://picsum.photos/seed/filo4/300/420', link: '/libros/filosofia/critica-de-la-razon-pura' },
        { title: 'El mundo de Sofía', author: 'J. Gaarder', cover: 'https://picsum.photos/seed/filo5/300/420', link: '/libros/filosofia/el-mundo-de-sofia' },
        { title: 'La genealogía de la moral', author: 'F. Nietzsche', cover: 'https://picsum.photos/seed/filo6/300/420', link: '/libros/filosofia/la-genealogia-de-la-moral' }
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
