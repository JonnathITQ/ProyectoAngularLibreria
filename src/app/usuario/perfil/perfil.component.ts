import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { urlMongo } from '../../services/urlMongo';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public identity: any;
  public usuario: any;
  public url: string;
  public imagenSubir: File | null = null;
  public nuevaContrasenia: string = '';
  public mostrarFormPassword: boolean = false;
  public mensaje: string = '';

  constructor(private _usuarioService: UsuarioService) {
    this.identity = this._usuarioService.getUsuario();
    this.url = urlMongo.url;
  }

  ngOnInit(): void {
    if (this.identity) {
      this.obtenerUsuario();
    }
  }

  obtenerUsuario() {
    this._usuarioService.verUsuario(this.identity._id).subscribe(
      response => {
        this.usuario = response.usuario;
        if (this.usuario.imagen) {
          this.usuario.imagen = this.url + 'tener-imagenUsuario/' + this.usuario.imagen;
        } else {
          this.usuario.imagen = 'assets/img/no-image.png';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.imagenSubir = <File>fileInput.target.files[0];
  }

  subirImagen() {
    if (this.imagenSubir) {
      this._usuarioService.subirImagen(this.usuario._id, this.imagenSubir).subscribe(
        response => {
          this.mensaje = 'Imagen actualizada correctamente';
          this.obtenerUsuario();
          this.imagenSubir = null; // Reset input
        },
        error => {
          console.log(error);
          this.mensaje = 'Error al subir la imagen';
        }
      );
    }
  }

  actualizarPassword() {
    if (this.nuevaContrasenia) {
      let updatePayload: any = {
        _id: this.usuario._id,
        contrasenia: this.nuevaContrasenia
      };

      this._usuarioService.actualizarUsuario(updatePayload).subscribe(
        response => {
          this.mensaje = 'Contraseña actualizada correctamente';
          this.nuevaContrasenia = '';
          this.mostrarFormPassword = false;
        },
        error => {
          console.log(error);
          this.mensaje = 'Error al actualizar la contraseña';
        }
      );
    }
  }
}
