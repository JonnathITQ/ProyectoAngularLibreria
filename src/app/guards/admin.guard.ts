import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private _empleadoService: EmpleadoService,
        private _router: Router
    ) { }

    canActivate(): boolean {

        if (!this._empleadoService.isAuthenticated()) {
            this._router.navigate(['/login']);
            return false;
        }
        
        var empleado=this._empleadoService.getEmpleado();

        if(empleado&&empleado.rol==='admin'){
        return true;
        }

        this._router.navigate(['/login']);
        return false;
    }
}
