import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BurguerComponent } from '../burguer/burguer.component';

@Component({
  selector: 'app-favorito',
  imports: [ReactiveFormsModule, FormsModule, BurguerComponent, NgIf, NgFor],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent {

  librosFavoritos: any[] = [];


}
