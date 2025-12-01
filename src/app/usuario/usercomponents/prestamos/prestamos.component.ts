import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BurguerComponent } from '../burguer/burguer.component';
import { Prestamos } from '../../../models/prestamos.model';
import { Libros } from '../../../models/libros.model';
import { PrestamosService } from '../../../services/prestamos.service';
import { LibrosService } from '../../../services/libros.service';
import { UsuarioService } from '../../../services/user.service';

@Component({
  selector: 'app-prestamos',
  imports: [BurguerComponent, CommonModule, FormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css',
  providers: [PrestamosService, LibrosService, UsuarioService],
  standalone: true
})
export class PrestamosComponent implements OnInit {
  public listaPrestamos: Prestamos[] = [];
  public listaLibros: Libros[] = [];
  public prestamo: Prestamos;
  public usuarioLogueadoId: String | null = null;
  public tieneMulta: boolean = false;
  public mensajeModal: string = ''; //notificaciones

  // Horas permitidas
  public horasDisponibles: number[] = [2, 3, 4, 5, 6, 7, 8]; 

  constructor(
    private _prestamosService: PrestamosService,
    private _librosService: LibrosService,
    private _usuarioService: UsuarioService
  ) {
    this.prestamo = new Prestamos('', '', '', '', 0, false); 
  }

  ngOnInit(): void {
    const usuarioInfo = this._usuarioService.getUsuario();
    if (usuarioInfo && usuarioInfo._id) {
        this.usuarioLogueadoId = String(usuarioInfo._id);
        
        this.verificarEstadoUsuario(this.usuarioLogueadoId);
        this.obtenerPrestamosUsuario();
        
        this.prestamo = new Prestamos('', this.usuarioLogueadoId, '', '', 0, false);
    } else {
        this.mensajeModal = 'Debe iniciar sesión para ver y solicitar préstamos.';
    }
    this.obtenerLibros();
  }

  // Verifica si el usuario tiene alguna multa activa
  
  verificarEstadoUsuario(usuarioId: String): void {
    this._prestamosService.verPrestamosUsuario(usuarioId).subscribe({
        next: (response) => {
            const prestamos = response.prestamo || [];
            this.tieneMulta = prestamos.some((p: Prestamos) => p.multa === true);

            if (this.tieneMulta) {
                this.mensajeModal = 'No puede solicitar nuevos préstamos debido a multas pendientes. Contacte a un bibliotecario.';
            } else {
                this.mensajeModal = 'Listo para solicitar un nuevo préstamo.';
            }
            this.listaPrestamos = prestamos;
        },
        error: (err) => {
            console.error("Error al verificar multa:", err);
            this.tieneMulta = false;
            this.mensajeModal = 'Error al verificar su estado. Intente más tarde.';
        }
    });
  }


  obtenerPrestamosUsuario() {
    if (this.usuarioLogueadoId) {
        this._prestamosService.verPrestamosUsuario(this.usuarioLogueadoId).subscribe({
            next: response => {
                this.listaPrestamos = response.prestamo || [];
            },
            error: error => {
                console.log(error);
            }
        });
    }
  }


  obtenerLibros() {
    this._librosService.verLibros().subscribe({
      next: response => {
        this.listaLibros = response.libro.filter((l: Libros) => Number(l.cantidad_disponible) > 0);
      },
      error: error => {
        console.log(error);
      }
    });
  }


  solicitarPrestamo(form: any) {
    if (this.tieneMulta) {
        this.mensajeModal = 'No puede solicitar préstamos. Tiene multas pendientes.';
        this.mostrarNotificacion();
        return;
    }
    
    this.prestamo.usuario_id = this.usuarioLogueadoId;
    this.prestamo.descripcion = 'Solicitud de préstamo por usuario.'; 
    this.prestamo.multa = false; 

    this._prestamosService.guardarPrestamo(this.prestamo).subscribe({
        next: response => {
            if (response.prestamo) {
                this.mensajeModal = 'Préstamo solicitado correctamente';
                this.obtenerPrestamosUsuario();
                this.resetForm(form);
                this.mostrarNotificacion();
                this.cerrarModalSolicitud();
                this.verificarEstadoUsuario(this.usuarioLogueadoId || ''); 
            } else {
                this.mensajeModal = 'Error al registrar el préstamo.';
                this.mostrarNotificacion();
            }
        },
        error: error => {
            console.error(error);
            this.mensajeModal = 'Error del servidor al solicitar préstamo.';
            this.mostrarNotificacion();
        }
    });
  }

  mostrarNotificacion() {
    setTimeout(() => this.mensajeModal = '', 5000); 
  }

  resetForm(form?: any) {
    if (form) {
      form.resetForm();
    }
    const id = this.usuarioLogueadoId || '';
    this.prestamo = new Prestamos('', id, '', '', 0, false);
  }
  
  cerrarModalSolicitud() {
  }

  prepararEliminacion(id: String) {}
  confirmarEliminacion() {}
  actualizarPrestamo() {}
  seleccionarPrestamo(p: Prestamos) {}
}