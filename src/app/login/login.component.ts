import { Component, OnInit, Output } from '@angular/core';
import { FruitTreeService } from '../fruit-tree.service';
import { User } from '../user.model';
import { Tree } from '../tree.model';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FruitTreeService]
})

export class LoginComponent implements OnInit {
  unsubscribe : any;
  unsubscribeNew : any;
  // uid : FirebaseObjectObservable<any>;

  constructor(private router: Router, private fruitTreeService: FruitTreeService, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

// New  User
  submitNewUser(email: string, password: string) {
    //signout anyone first
    if (this.auth.auth.currentUser){
      this.auth.auth.signOut();
    }
    console.log("Submit new user login form "+email);
    this.fruitTreeService.newSignIn(email,password);
    console.log("New SignInsubmitted:");

    this.unsubscribeNew = this.auth.auth.onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
        console.log("**NEW user signed in "+user.email);
        console.log("**Adding to database "+user.email+" "+user.uid);
        var newUser = new User(user.uid,user.email);
        this.fruitTreeService.addUser(newUser);
        window.sessionStorage.setItem('userId', user.uid);

        // this.setUserId(user.uid);
        //now switchto user page
        this.router.navigate(['users',user.uid]);
      } else {
        // No user is signed in.
        console.log("no one signed in");
      }
    });
  }

// Existing user login
  submitLogin(email: string, password: string) {

    if (this.auth.auth.currentUser){
      this.auth.auth.signOut();
    }
    console.log("Submit login form "+email);
    this.fruitTreeService.signIn(email,password);
    console.log("signIn submitted:");
    this.unsubscribe = this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("Existing user signed in "+user.email);
        window.sessionStorage.setItem('userId', user.uid);
        // this.setUserId(user.uid);
        this.router.navigate(['users',user.uid]);
      } else {
        // No user is signed in.
        console.log("no one signed in");
      }
    });

  }

  submitLogout() {
    sessionStorage.clear();
    console.log("Logging out currentUser : ");
    this.auth.auth.signOut();
    console.log("remove listeners : ");
    // this.unsubscribe is not a function
    //this.unsubscribe();
    //this.unsubscribeNew();
  }

}
