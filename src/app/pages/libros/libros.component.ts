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

  public generos: { titulo: string; libros: Libros[] }[] = [];
  public libros: Libros[] = [];
  public url = urlMongo.url;

  constructor(
    private _librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this._librosService.verLibros().subscribe(
      response => {
        if (response.libro) {
          this.libros = response.libro;
          this.agruparPorGenero();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  agruparPorGenero() {
    const grupos: { [key: string]: Libros[] } = {};

    this.libros.forEach(libro => {

      if (libro.portada) {
        libro.portada = this.url + 'tener-portada/' + libro.portada;
      } else {

        libro.portada = 'assets/img/no-image.png';
      }

      const genero = libro.genero.toString();
      if (!grupos[genero]) {
        grupos[genero] = [];
      }
      grupos[genero].push(libro);
    });

    this.generos = Object.keys(grupos).map(genero => ({
      titulo: genero,
      libros: grupos[genero]
    }));
  }

  scroll(index: number, dir: 'prev' | 'next') {
    const tracks = document.querySelectorAll<HTMLDivElement>('.carousel-track');
    const el = tracks[index];
    if (!el) return;
    const delta = el.clientWidth;
    el.scrollBy({ left: dir === 'next' ? delta : -delta, behavior: 'smooth' });
  }
}
