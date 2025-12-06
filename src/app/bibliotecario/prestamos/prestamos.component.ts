import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prestamos } from '../../models/prestamos';
import { PrestamosService } from '../../services/prestamos.service';
import { MAddEditPComponent } from '../m-add-edit-p/m-add-edit-p.component';
import { MDeletePComponent } from '../m-delete-p/m-delete-p.component';

@Component({
  selector: 'app-prestamos',
  imports: [SidebarComponent, CommonModule, FormsModule, MAddEditPComponent, MDeletePComponent],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css',
  providers: [PrestamosService],
  standalone: true
})
export class PrestamosComponent implements OnInit {
  public listaPrestamos: Prestamos[] = [];

  @ViewChild(MAddEditPComponent) mAddEditP!: MAddEditPComponent;
  @ViewChild(MDeletePComponent) mDeleteP!: MDeletePComponent;

  constructor(
    private _prestamosService: PrestamosService
  ) { }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos() {
    this._prestamosService.verPrestamos().subscribe(
      response => {
        this.listaPrestamos = response.prestamo;
      },
      error => {
        console.log(error);
      }
    );
  }

  abrirModalNuevo() {
    this.mAddEditP.resetForm();
  }

  abrirModalEditar(prestamo: Prestamos) {
    this.mAddEditP.seleccionarPrestamo(prestamo);
  }

  abrirModalEliminar(id: String, prestamo: Prestamos) {
    this.mDeleteP.prepararEliminacion(id, prestamo);
  }
}
