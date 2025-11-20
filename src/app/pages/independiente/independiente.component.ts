import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface BookDetail {
  id: number;
  title: string;
  author: string;
  cover: string;
  link: string;
  description?: string;
  genre?: string;
  year?: number;
  language?: string;
  location?: { shelf: string; row: number };
}

@Component({
  selector: 'app-independiente',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './independiente.component.html',
  styleUrl: './independiente.component.css'
})
export class IndependienteComponent {
  book?: BookDetail;

  constructor(private route: ActivatedRoute) {
    const state = history.state as any;
    if (state && state.book) {
      const b = state.book;
      
      this.book = {
        id: b.id,
        title: b.title || b.titulo,
        author: b.author || b.autor,
        cover: b.cover || b.portada,
        link: b.link,
        description: b.description || b.descripcion,
        genre: b.genre || b.genero,
        year: b.year || b.anio,
        language: b.language || b.idioma,
        location: b.location || b.ubicacion
          ? {
              shelf: (b.location?.shelf || b.ubicacion?.estante) ?? '—',
              row: (b.location?.row || b.ubicacion?.fila) ?? 0
            }
          : { shelf: '—', row: 0 }
      };
    } else {
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = idParam ? parseInt(idParam, 10) : NaN;
      this.book = {
        id,
        title: 'Detalle no disponible',
        author: '—',
        cover: 'assets/logo.png',
        link: '',
        description: 'No se encontró información para este libro.',
        genre: '—',
        language: '—',
        location: { shelf: '—', row: 0 }
      };
    }
  }

  descargarPDF(link: string) {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
