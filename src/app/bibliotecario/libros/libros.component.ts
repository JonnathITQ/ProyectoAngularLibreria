import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LibrosService } from '../../services/libros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libros } from '../../models/libros';
import { urlMongo } from '../../services/urlMongo';
import { MAddEditLibComponent } from '../m-add-edit-lib/m-add-edit-lib.component';
import { MDeleteLibComponent } from '../m-delete-lib/m-delete-lib.component';

@Component({
  selector: 'app-libros',
  imports: [SidebarComponent, CommonModule, FormsModule, MAddEditLibComponent, MDeleteLibComponent],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css',
  providers: [LibrosService],
  standalone: true
})
export class LibrosComponent implements OnInit {
  public listaLibros: Libros[] = [];
  public url: string = urlMongo.url;
  public page: number = 1;
  public pageSize: number = 5;
  public Math = Math;

  @ViewChild(MAddEditLibComponent) mAddEditLib!: MAddEditLibComponent;
  @ViewChild(MDeleteLibComponent) mDeleteLib!: MDeleteLibComponent;

  constructor(
    private _librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this._librosService.verLibros().subscribe(
      response => {
        this.listaLibros = response.libro;
      },
      error => {
        console.log(error);
      }
    );
  }

  abrirModalNuevo() {
    this.mAddEditLib.resetForm();
  }

  abrirModalEditar(libro: Libros) {
    this.mAddEditLib.seleccionarLibro(libro);
  }

  abrirModalEliminar(id: String, libro: Libros) {
    this.mDeleteLib.prepararEliminacion(id, libro);
  }
}

