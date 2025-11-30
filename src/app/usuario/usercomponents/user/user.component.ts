import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

    constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

}
