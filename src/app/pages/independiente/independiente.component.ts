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
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  providers: [LibrosService, UsuarioService, HistorialService],
  templateUrl: './independiente.component.html',
  styleUrl: './independiente.component.css'
})
export class IndependienteComponent implements OnInit {
  public libro: Libros | null = null;
  public url = urlMongo.url;

  constructor(
    private _route: ActivatedRoute,
    private _librosService: LibrosService,
    private _usuarioService: UsuarioService,
    private _historialService: HistorialService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.obtenerLibro(id);
    });
  }

  obtenerLibro(id: string) {
    this._librosService.verLibro(id).subscribe(
      response => {
        if (response.libro) {
          this.libro = response.libro;
          if (this.libro && this.libro.portada) {
            this.libro.portada = this.url + 'tener-portada/' + this.libro.portada;
          } else if (this.libro) {
            this.libro.portada = 'assets/img/no-image.png';
          }

          this.agregarAHistorial(id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarAHistorial(libroId: string) {
    const identity = this._usuarioService.getUsuario();
    if (identity && identity._id) {
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
