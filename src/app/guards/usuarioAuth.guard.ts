import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

    constructor(
        private _empleadoService: UsuarioService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        if (this._empleadoService.isAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login-usuario']);
            return false;
        }
    }
}