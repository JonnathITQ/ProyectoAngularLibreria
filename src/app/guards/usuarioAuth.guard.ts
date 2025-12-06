import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

    // Inyección de dependencias:
    //UsuarioService: permite validar si el usuario está autenticado.
    //Router: permite redirigir a otra ruta cuando el acceso es bloqueado.
    constructor(
        private _empleadoService: UsuarioService,
        private _router: Router
    ) { }

    // Método de la interfaz CanActivate.
    // Se ejecuta cuando el usuario intenta entrar a una ruta protegida.
    canActivate(): boolean {
        // Verifica si el usuario está autenticado llamando al método del servicio.
        if (this._empleadoService.isAuthenticated()) {
            return true; // Si está autenticado = puede pasar a la ruta protegida.
        } else {
            // Si no está autenticado = se lo redirige al login del usuario.
            this._router.navigate(['/login-usuario']);
            return false;// Y se bloquea el acceso a la ruta.
        }
    }
}