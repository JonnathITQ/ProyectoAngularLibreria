import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-burguer',
  imports: [CommonModule, RouterModule],
  templateUrl: './burguer.component.html',
  styleUrl: './burguer.component.css'
})
export class BurguerComponent {

    isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar() {
    this.isOpen = false;
  }

}
