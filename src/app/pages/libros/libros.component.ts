import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule],
  providers: [LibrosService],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {

  public generos: { titulo: string; libros: Libros[] }[] = []; // Array final que contendrá los géneros y los libros agrupados
  public libros: Libros[] = []; // Lista original de todos los libros
  public url = urlMongo.url; // URL base del backend

  constructor(
    private _librosService: LibrosService
  ) { }

  // Al inicializar el componente, cargamos todos los libros
  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    // Llamamos al servicio para obtener todos los libros
    this._librosService.verLibros().subscribe(
      response => {
        if (response.libro) {
          // Guardamos la lista de libros
          this.libros = response.libro;
          // Agrupamos por género
          this.agruparPorGenero();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  agruparPorGenero() {
    // Creamos un objeto temporal para agrupar libros según el género
    const grupos: { [key: string]: Libros[] } = {};

    this.libros.forEach(libro => {

      // Si tiene portada, construimos la URL completa
      if (libro.portada) {
        libro.portada = this.url + 'tener-portada/' + libro.portada;
      } else {
        // Si no tiene portada, se asigna una imagen por defecto
        libro.portada = 'assets/img/no-image.png';
      }

      // Convertimos el género en texto para usarlo como clave
      const genero = libro.genero.toString();
      // Si el género no existe en el objeto, lo creamos
      if (!grupos[genero]) {
        grupos[genero] = [];
      }
      // Agregamos el libro al grupo correspondiente
      grupos[genero].push(libro);
    });

    // Convertimos el objeto en un arreglo que será usado por el template
    this.generos = Object.keys(grupos).map(genero => ({
      titulo: genero,
      libros: grupos[genero]
    }));
  }

  scroll(index: number, dir: 'prev' | 'next') {
    // Seleccionamos todos los contenedores deslizables del carrusel
    const tracks = document.querySelectorAll<HTMLDivElement>('.carousel-track');
    // Tomamos el track del género correspondiente
    const el = tracks[index];
    if (!el) return;
    // Cantidad a desplazar = el ancho del contenedor
    const delta = el.clientWidth;
    // Desplazamos suavemente hacia izquierda o derecha
    el.scrollBy({ left: dir === 'next' ? delta : -delta, behavior: 'smooth' });
  }
}
