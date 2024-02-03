import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router){}

  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  goToLogin(){
    this.router.navigateByUrl("/login");
  }
}
