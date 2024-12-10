import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    
    // this.firebaseAuthenticationService.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem('user', 'null');
    //   }
    // })

  }

  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //this.userData as User;
        //this.userData.id = { id: userCredential.user?.uid, email : userCredential.user?.email};
        this.userData = userCredential.user
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['main']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get userEmail(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.email ;
  }
  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}