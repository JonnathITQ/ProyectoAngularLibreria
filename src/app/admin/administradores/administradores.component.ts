import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminService } from '../../services/admin.service';
import { Empleado } from '../../models/empleado';
@Component({
  selector: 'app-administradores',
  imports: [CommonModule,SidebarComponent ],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.css',
  standalone: true, 
  providers: [AdminService]
})

export class AdministradoresComponent {
    public listaAdmin: Empleado[] = []; //Guardo en un vector  la lista de admins cargados en la bdd
    public loading: boolean=false //lista de carga
    public errorMessage: String | null = null; //Se puso esto para ver errores


    constructor(
      private _adminService: AdminService
    ){}    
    ngOnInit(): void {
    this.obtenerAdmins();
  }

  obtenerAdmins(): void {
    this.loading = true;
    this.errorMessage = null;

    this._adminService.verAdmin().subscribe({   // ← OJO: verAdmins()
      next: (response) => {
        console.log('Respuesta admins =>', response);

        // El backend devuelve { empleado: [...] }
        const data = response.empleado || response.empleados || [];

        // Normalizamos: siempre un array
        if (Array.isArray(data)) {
          this.listaAdmin = data;
        } else if (data) {
          this.listaAdmin = [data];
        } else {
          this.listaAdmin = [];
        }

        console.log('Admins Cargados:', this.listaAdmin);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar admins', err);
        this.errorMessage = 'No se pudieron cargar los administradores.';
        this.listaAdmin = [];
        this.loading = false;
      }
    });
  }
}



