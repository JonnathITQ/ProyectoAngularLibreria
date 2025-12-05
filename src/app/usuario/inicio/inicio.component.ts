import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [UsuarioService]
})
export class InicioComponent implements OnInit {
  public usuario: any;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.getUsuario();
  }
}
