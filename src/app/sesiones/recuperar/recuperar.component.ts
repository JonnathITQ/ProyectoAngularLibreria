import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css',
  providers: [UsuarioService]
})
export class RecuperarComponent {
  public correo: string = "";
  public nuevaContrasenia: string = "";
  public status: string = "";

  public errorMessage: string = "";

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  onSubmit(form: any) {
    const datos = {
      correo: this.correo,
      nuevaContrasenia: this.nuevaContrasenia
    };

    this._usuarioService.recuperar(datos).subscribe(
      response => {
        if (response.message) {
          this.status = 'success';
          this.errorMessage = ""; // Clear error on success
          form.reset();
          setTimeout(() => {
            this._router.navigate(['/login-usuario']);
          }, 2000);
        } else {
          this.status = 'failed';
          this.errorMessage = "Error desconocido al recuperar contraseña.";
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'failed';
        // Capture specific error message from backend or use default
        this.errorMessage = error.error?.message || "Error al recuperar contraseña. Verifica que el correo esté registrado.";
      }
    );
  }
}
