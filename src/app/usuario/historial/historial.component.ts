import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HistorialService } from '../../services/historial.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { urlMongo } from '../../services/urlMongo';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  providers: [UsuarioService, HistorialService]
})
export class HistorialComponent implements OnInit {
  public identity: any;
  public historialLibros: any[] = [];
  public url: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _historialService: HistorialService
  ) {
    this.identity = this._usuarioService.getUsuario();
    this.url = urlMongo.url;
  }

  ngOnInit(): void {
    if (this.identity) {
      this.obtenerHistorial();
    }
  }

  obtenerHistorial() {
    this._historialService.verHistorial(this.identity._id).subscribe(
      response => {
        if (response.historial) {
          // Map the history entries to get the book details and filter out nulls
          this.historialLibros = response.historial
            .map((h: any) => h.libro)
            .filter((libro: any) => libro !== null && libro !== undefined);

          this.procesarImagenes(this.historialLibros);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  procesarImagenes(libros: any[]) {
    libros.forEach(libro => {
      if (libro && libro.portada && !libro.portada.startsWith('http')) {
        libro.portada = this.url + 'tener-portada/' + libro.portada;
      } else if (libro && !libro.portada) {
        libro.portada = 'assets/img/no-image.png';
      }
    });
  }
}
