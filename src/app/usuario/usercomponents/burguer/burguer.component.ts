import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UsuarioService } from '../../../services/user.service';

@Component({
  selector: 'app-burguer',
  imports: [CommonModule, RouterModule],
  templateUrl: './burguer.component.html',
  styleUrl: './burguer.component.css',
  providers: [UsuarioService]
})
export class BurguerComponent {

    isOpen = false;

    constructor(private _usuarioService: UsuarioService, private _router: Router) { }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  logout() {
    this._usuarioService.logout();
    this._router.navigate(['/login-usuario']);
    this.closeSidebar();
  }

}
