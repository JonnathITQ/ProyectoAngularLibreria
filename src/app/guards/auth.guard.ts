import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _usuarioService: UsuarioService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        if (this._usuarioService.isAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login-usuario']);
            return false;
        }
    }
}