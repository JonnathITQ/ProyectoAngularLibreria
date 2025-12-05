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
        if (response.token) {
          this.status = 'success';
          this._empleadoService.setToken(response.token);
          this._empleadoService.setEmpleado(response.empleado);

          // Redirigir según el rol si es necesario, por ahora a bibliotecario
          this._router.navigate(['/bibliotecario']);
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'failed';
      }
    );
  }
}
