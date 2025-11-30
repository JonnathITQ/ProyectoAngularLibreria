import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BurguerComponent } from "../burguer/burguer.component";

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, FormsModule, BurguerComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario = {
    nombre: 'Lesly',
    apellido: 'Becerra',
    cedula: '1716797536',
    correo: 'lesly@itq.edu.ec',
    passwordHash: '********'
  };

  editarDatos() {
    console.log("Editar datos...");
  }

  cambiarPassword() {
    console.log("Cambiar contraseña...");
  }


}
