import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';



@Component({
  selector: 'app-independiente',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './independiente.component.html',
  styleUrl: './independiente.component.css'
})
export class IndependienteComponent {
}
