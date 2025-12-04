import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BurguerComponent } from "../burguer/burguer.component";
import { Usuarios } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { urlMongo } from '../../../services/urlMongo';

@Component({
  selector: 'app-perfil',
  imports: [HttpClientModule, FormsModule, BurguerComponent, ReactiveFormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

    usuario: Usuarios = new Usuarios(
        '', // _id
        '', // nombre
        '', // apellido
        '', // cedula
        '', // correo
        '', // contrasenia
        '', // descripcion
        null, // imagen
        [] // favoritos
    );

    // Variables para la foto de perfil
    public imagenSeleccionada: File | null = null;
    public urlImagenActual: string | null = null;
    public urlBackend: string = urlMongo.url;

    // Objeto para manejar el formulario de cambio de contraseña
    passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    mostrarCambioPassword: boolean = false;

    // Mensajes de feedback para el usuario
    mensajeDatos: string = '';
    mensajePassword: string = '';
    mensajeFoto: string = '';


    constructor(
        private _usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.cargarDatosUsuario();
    }

    cargarDatosUsuario(): void {
        const usuarioLogueado = this._usuarioService.getUsuario();

        if (usuarioLogueado && usuarioLogueado._id) {
            this._usuarioService.verUsuario(usuarioLogueado._id).subscribe({
                next: (response) => {
                    if (response.usuario) {
                        this.usuario = { ...response.usuario }; // Usar spread para asignar todos los campos
                        this.usuario.contrasenia = '********';

                        // Configurar URL de la imagen actual
                        if (this.usuario.imagen) {
                            this.urlImagenActual = this.urlBackend + 'tener-imagenUsuario/' + this.usuario.imagen;
                        } else {
                            this.urlImagenActual = null;
                        }

                        this.mensajeDatos = '';
                    }
                },
                error: (err) => {
                    console.error('Error al cargar el usuario:', err);
                    this.mensajeDatos = 'Error: No se pudieron cargar los datos del perfil';
                }
            });
        } else {
            this.mensajeDatos = 'Error: Usuario no autenticado o ID no disponible';
        }
    }

    editarDatos() {
        this.mensajeDatos = '';

        if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.correo) {
             this.mensajeDatos = 'Por favor, complete todos los campos requeridos';
             return;
        }

        const datosAEnviar = {
            _id: this.usuario._id,
            nombre: this.usuario.nombre,
            apellido: this.usuario.apellido,
            correo: this.usuario.correo,
            descripcion: this.usuario.descripcion // Añadir la descripción al objeto de envío
        };

        this._usuarioService.actualizarDatosPerfil(datosAEnviar).subscribe({
            next: (response) => {
                this.mensajeDatos = 'Exito ' + response.message;
                this.cargarDatosUsuario(); // Recargar para actualizar localmente
            },
            error: (err) => {
                this.mensajeDatos = 'Error' + (err.error?.message || 'Error de conexión');
                console.error('Error al actualizar datos:', err);
            }
        });
    }

    onFileSelected(event: any): void {
        this.mensajeFoto = '';
        const file: File = event.target.files[0];

        if (file) {
            // Validación básica del tipo de archivo
            if (!file.type.match(/image\/(jpeg|png|gif)/)) {
                this.mensajeFoto = 'Error: Solo se permiten imágenes (JPG, PNG, GIF)';
                this.imagenSeleccionada = null;
                return;
            }
            this.imagenSeleccionada = file;
            this.subirFoto();
        }
    }

    subirFoto(): void {
    if (!this.imagenSeleccionada || !this.usuario._id) {
        this.mensajeFoto = 'Error: Selecciona un archivo y asegúrate de que el ID del usuario está disponible.';
        return;
    }

    this.mensajeFoto = 'Subiendo imagen...';

    const userId: string = this.usuario._id as string;

    this._usuarioService.subirImagen(userId, this.imagenSeleccionada).subscribe({
        next: (response) => {
            this.mensajeFoto = 'Exito: Imagen actualizada correctamente';
            this.imagenSeleccionada = null; // Limpiar selección
            this.cargarDatosUsuario(); // Recargar el perfil para mostrar la nueva imagen
        },
        error: (err) => {
            this.mensajeFoto = 'Error: Falló la subida de imagen. ' + (err.error?.message || 'Error de conexión');
            console.error('Error al subir imagen:', err);
        }
    });
}

    toggleCambiarPassword() {
        this.mostrarCambioPassword = !this.mostrarCambioPassword;
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' }; // Limpiar formulario
        this.mensajePassword = '';
    }


    cambiarPassword() {
        this.mensajePassword = '';

        if (!this.passwordData.currentPassword || !this.passwordData.newPassword || !this.passwordData.confirmPassword) {
            this.mensajePassword = 'Todos los campos son obligatorios';
            return;
        }

        if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
            this.mensajePassword = 'La nueva contraseña y su confirmación no coinciden';
            return;
        }

        if (this.passwordData.newPassword.length < 6) {
             this.mensajePassword = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }

        this._usuarioService.cambiarContrasena(
            this.usuario._id,
            this.passwordData.currentPassword,
            this.passwordData.newPassword
        ).subscribe({
            next: (response) => {
                this.mensajePassword = 'Exito ' + response.message;
                this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
                this.mostrarCambioPassword = false;
            },
            error: (err) => {
                this.mensajePassword = 'Error' + (err.error?.message || 'Error desconocido');
                console.error('Error al cambiar contraseña:', err);
            }
        });
    }
}
