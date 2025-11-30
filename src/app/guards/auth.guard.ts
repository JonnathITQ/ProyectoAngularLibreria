import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _empleadoService: EmpleadoService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        if (this._empleadoService.isAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}
