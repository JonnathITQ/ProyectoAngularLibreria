import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  standalone: true,// Componente independiente (no necesita un módulo)
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css',
  providers: [UsuarioService]// Instancia propia del servicio solo para este componente
})
export class LoginUsuarioComponent {
  public usuario: any;// Objeto que contiene los datos enviados desde el formulario
  public status: string = "";// Variable para mostrar "success" o "failed"

  constructor(
    private _usuarioService: UsuarioService,// Servicio que maneja el login del usuario
    private _router: Router// Servicio Angular para navegar entre rutas
  ) {
    // Se inicializa el objeto para el formulario
    this.usuario = {
      correo: '',// Campo del correo del usuario
      contrasenia: ''// Campo de contraseña
    };
  }

  // Método que se ejecuta cuando el usuario envía el formulario
  onSubmit(form: any) {
    console.log("Enviando al login: ", this.usuario); //Quería ver si todo funcionaba en mostrar los datos
    // Llamada al backend a través del servicio de usuarios
    this._usuarioService.login(this.usuario).subscribe(
      response => {
        console.log("Login respuesta: ", response); //Quería ver si lo recibía bien el backend, es un debug
        // Validamos si la API devolvió un token
        if (response.token) {
          this.status = 'success';// Login exitoso
          this._usuarioService.setToken(response.token);
          this._usuarioService.setUsuario(response.usuario);
          // Redirige al área interna del usuario
          this._router.navigate(['/usuario']);
        } else {
          // Si no hay token, se considera fallo en el login
          console.warn("Token missing in response");
          this.status = 'failed';
        }
      },
      // Si el servidor responde con un error
      error => {
        console.log(<any>error); //muestra cualquier tipo de error
        this.status = 'failed';//Se indica que fallo
      }
    );
  }
}
