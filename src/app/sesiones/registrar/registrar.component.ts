import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../models/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,// Es un componente standalone (no necesitará módulo)
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
  providers: [UsuarioService]// Servicio propio (instancia solo para este componente)
})
export class RegistrarComponent {
  public usuario: Usuarios;// Modelo con los datos del usuario
  public status: string = "";// Para mostrar success o failed en pantalla

  constructor(
    private _usuarioService: UsuarioService,// Servicio para comunicar con backend
    private _router: Router// Servicio para navegar entre rutas
  ) {
    // Se crea un nuevo objeto usuario con todos sus campos vacíos
    this.usuario = new Usuarios("", "", "", "", "", "", "");
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(form: any) {
    // Se hace una petición al backend para guardar al usuario
    this._usuarioService.guardarUsuarios(this.usuario).subscribe(
      response => {
        // Si el backend respondió con "usuario" entonces se registró correctamente
        if (response.usuario) {
          this.status = 'success'; //msg de éxito
          form.reset(); //Se resetea el formulario
          // Después de 2 segundos, redirigir al login de usuario
          setTimeout(() => {
            this._router.navigate(['/login-usuario']);
          }, 2000); //Está en milisegundos
        } else {
          this.status = 'failed';// Si el backend no devolvió usuario entonces dará error
        }
      },
      // Si hubo un error en la petición 
      error => {
        console.log(<any>error);//Mostrará cualquier tipo de error
        this.status = 'failed';//Error
      }
    );
  }
}
