import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,// Componente independiente (No necesita módulo)
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public empleado: any;// Objeto donde se guardarán los datos del formulario
  public status: string = "";// Indicador para mostrar success/error 

  constructor(
    private _empleadoService: EmpleadoService,// Servicio que gestiona login, token y empleado
    private _router: Router// Servicio para navegar entre rutas
  ) {
    // Objeto inicial para completar el formulario
    this.empleado = {
      correo: '',
      contrasenia: ''
    };
  }

  // Método que se ejecuta cuando el usuario envía el formulario
  onSubmit(form: any) {
    // Llamamos al servicio para autenticar al empleado
    this._empleadoService.login(this.empleado).subscribe(
      response => {
        console.log('solo para ver si funciona xd: ', response); // Mensaje para para ver si funciona el login xd

        // Verificamos si el backend devolvió un token y los datos del empleado
        if (response.token && response.empleado) {
          // Notificamos que todo salió bien
          this.status = 'success';
          // Guardamos el token y el empleado en localStorage
          this._empleadoService.setToken(response.token);
          this._empleadoService.setEmpleado(response.empleado);

          // Obtenemos el rol y lo normalizamos (minúsculas y sin espacios)
          let rol: string = response.empleado.rol || '';
          rol = rol.toLowerCase().trim();

          // Si es admin = redirige al dashboard de administrador
          if (rol === 'admin') {
            this._router.navigate(['/administrador']);
            // Si es otro rol = redirige a la vista de bibliotecario
          } else {
            this._router.navigate(['/bibliotecario']);
          }
        } else {
          // Si no viene token o empleado entonces dará un login fallido
          this.status = 'failed';
        }
      },
      // Si ocurre un error al llamar al backend entonces saldrá login fallido
      error => {
        console.log('Error en login: ', error);
        this.status = 'failed';
      }
    );
  }
}