import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [UsuarioService]
})
export class SidebarComponent {
  isOpen = false; //Estado para abrir y cerrar la sidebar

  constructor(private _usuarioService: UsuarioService, private _router: Router) { }

  //Activa la sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  //Oculta la sidebar
  closeSidebar() {
    this.isOpen = false;
  }

  logout() {
    this._usuarioService.logout();
    this._router.navigate(['/login']);
    this.closeSidebar();
  }
}
