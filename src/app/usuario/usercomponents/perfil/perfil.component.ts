import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BurguerComponent } from "../burguer/burguer.component";
import { Usuarios } from '../../../models/usuario.model'; 
import { UsuarioService } from '../../../services/user.service'; 
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
        null // imagen
    );

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
                        this.usuario = new Usuarios(
                            response.usuario._id,
                            response.usuario.nombre,
                            response.usuario.apellido,
                            response.usuario.cedula,
                            response.usuario.correo,
                            '********', 
                            response.usuario.imagen
                        );
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

        this._usuarioService.actualizarDatosPerfil(this.usuario).subscribe({
            next: (response) => {

                this.mensajeDatos = 'Exito ' + response.message;
                this.cargarDatosUsuario();
            },
            error: (err) => {
                this.mensajeDatos = 'Error' + (err.error?.message || 'Error de conexión');
                console.error('Error al actualizar datos:', err);
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