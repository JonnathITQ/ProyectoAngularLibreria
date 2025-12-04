import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  public usuario: any;
  public status: string = "";

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuario = {
      correo: '',
      contrasenia: ''
    };
  }

  onSubmit(form: any) {
    console.log("Submitting login form:", this.usuario);
    this._usuarioService.login(this.usuario).subscribe(
      response => {
        console.log("Login response:", response);
        if (response.token) {
          this.status = 'success';
          this._usuarioService.setToken(response.token);
          this._usuarioService.setUsuario(response.usuario);

          this._router.navigate(['/usuario']); // Redirect to home or user dashboard
        } else {
          console.warn("Token missing in response");
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
