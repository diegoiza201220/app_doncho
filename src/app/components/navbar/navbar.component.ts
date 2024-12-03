import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/util/base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  mostrarItems: boolean = false;
  mostrarReportes: boolean = false;
  
  constructor(public override authService: AuthService
  ) {
    super(authService);
  }

  ngOnInit(): void {
   this.configureMenu();
  }

  logOut(){
    this.authService.logOut();
  }

  configureMenu(){
    this.mostrarItems = this.mostrarReportes = this.emailsPermitidos.indexOf(this.authService.userData.email) !== -1;
  }
}
