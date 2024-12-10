import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BaseComponent } from './util/base.component';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  showNavBar!: boolean;

  constructor(private primengConfig: PrimeNGConfig, public override authService: AuthService) {
    super(authService);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.showNavBar = this.isloggedIn;
  }

  title = 'app_doncho';


}
