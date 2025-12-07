import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { LogsService } from '../../services/logs.service';
import { EmpleadoService } from '../../services/empleado.service';
import { ModalRegistroEditEmpleadoComponent } from '../modal-registro-edit-empleado/modal-registro-edit-empleado.component';
import { ModalEliminarEmpleadoComponent } from '../modal-eliminar-empleado/modal-eliminar-empleado.component';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, FormsModule, SidebarComponent, ModalRegistroEditEmpleadoComponent, ModalEliminarEmpleadoComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
  providers: [EmpleadosService, LogsService],
  standalone: true
})
export class EmpleadosComponent implements OnInit {
  @ViewChild(ModalRegistroEditEmpleadoComponent) modalRegistro!: ModalRegistroEditEmpleadoComponent;
  @ViewChild(ModalEliminarEmpleadoComponent) modalEliminar!: ModalEliminarEmpleadoComponent;

  public listaEmpleados: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadosService,
    private empleadosService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.verEmpleados().subscribe(
      response => {
        const empleados = response.empleado || response.empleados || [];
        this.listaEmpleados = empleados.filter((e: any) => e.rol !== 'admin');
        console.log('Empleados Cargados:', this.listaEmpleados);
      },
      error => {
        console.log('Error al cargar empleados', error);
      }
    );
  }

  seleccionarEmpleado(empleado: Empleado) {
    this.modalRegistro.abrirModal(empleado);
  }

  prepararEliminacion(id: String) {
    this.modalEliminar.abrirModal(id);
  }

  abrirModalRegistro() {
    this.modalRegistro.abrirModal();
  }
}
