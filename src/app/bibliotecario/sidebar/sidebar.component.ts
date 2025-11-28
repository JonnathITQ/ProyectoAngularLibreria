import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = false; //Estado para abrir y cerrar la sidebar


  //Activa la sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  //Oculta la sidebar
  closeSidebar() {
    this.isOpen = false;
  }
}
