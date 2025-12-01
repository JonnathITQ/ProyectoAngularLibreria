import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/user.service';
import { Usuarios } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
  providers: [UsuarioService]
})
export class RegistrarComponent {
  public usuario: Usuarios;
  public status: string = "";

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuario = new Usuarios("", "", "", "", "", "", "");
  }

  onSubmit(form: any) {
    this._usuarioService.guardarUsuarios(this.usuario).subscribe(
      response => {
        if (response.usuario) {
          this.status = 'success';
          form.reset();
          setTimeout(() => {
            this._router.navigate(['/login-usuario']);
          }, 2000);
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