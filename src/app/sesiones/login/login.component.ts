import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public empleado: any;
  public status: string = "";

  constructor(
    private _empleadoService: EmpleadoService,
    private _router: Router
  ) {
    this.empleado = {
      correo: '',
      contrasenia: ''
    };
  }

  onSubmit(form: any) {
    this._empleadoService.login(this.empleado).subscribe(
      response => {
        console.log('Respuesta login =>', response);   //DEBUG

        if (response.token && response.empleado) {
          this.status = 'success';
          this._empleadoService.setToken(response.token);
          this._empleadoService.setEmpleado(response.empleado);

          let rol: string = response.empleado.rol || '';
          rol = rol.toLowerCase().trim();

          if (rol === 'admin') {
            this._router.navigate(['/administrador']);
          } else {
            this._router.navigate(['/bibliotecario']);
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log('Error en login =>', error);
        this.status = 'failed';
      }
    );
  }
}