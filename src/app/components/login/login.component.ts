import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/util/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {



  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password);
  }
}