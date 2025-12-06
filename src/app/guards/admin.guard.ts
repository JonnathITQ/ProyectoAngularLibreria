import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    // Inyección de dependencias:
    // EmpleadoService: para validar si el usuario está logeado y obtener su rol.
    // Router: para redirigir al usuario si no tiene permiso.
    constructor(
        private _empleadoService: EmpleadoService,
        private _router: Router
    ) { }

    // Método requerido por la interfaz CanActivate.
    // Se ejecuta cada vez que se intenta acceder a una ruta protegida.
    canActivate(): boolean {

        // 1. Verifica si el usuario NO está autenticado.
        //Si no lo está, lo redirige al login y bloquea el acceso.
        if (!this._empleadoService.isAuthenticated()) {
            this._router.navigate(['/login']);
            return false; // No puede acceder a la ruta
        }

        // 2. Obtiene el usuario (empleado) que está actualmente logeado.
        var empleado = this._empleadoService.getEmpleado();

        // 3. Verifica si el empleado existe y si su rol es 'admin'.
        //Si lo es, permite el acceso.
        if (empleado && empleado.rol === 'admin') {
            return true; // Acceso permitido
        }

        // 4. Si el usuario está autenticado pero NO es admin:
        //Lo redirige al login (o a otra ruta si deseas) y bloquea el acceso.
        this._router.navigate(['/login']);
        return false;
    }
}
