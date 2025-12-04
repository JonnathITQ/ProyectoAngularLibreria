import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BurguerComponent } from "../burguer/burguer.component";

@Component({
  selector: 'app-user',
  imports: [RouterModule, CommonModule, BurguerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

    constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

}
