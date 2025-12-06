import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    // Inyección de dependencias:
    // EmpleadoService: para verificar si el usuario está autenticado.
    // Router: para redirigir a rutas deseadas cuando el acceso es denegado.
    constructor(
        private _empleadoService: EmpleadoService,
        private _router: Router
    ) { }

    //Este método se ejecuta cada vez que un usuario intenta acceder 
    //a una ruta protegida por este guard.
    canActivate(): boolean {
        // Verifica si el usuario está autenticado llamando al método del servicio.
        if (this._empleadoService.isAuthenticated()) {
            return true;// Si está autenticado, permite acceder a la ruta.
        } else {
            // Si no está autenticado, redirige al login.
            this._router.navigate(['/login']);
            return false;// Devuelve false para bloquear el acceso a la ruta.
        }
    }
}
