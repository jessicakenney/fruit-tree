// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
import { Component, OnInit, Output } from '@angular/core';
import { FruitTreeService } from '../fruit-tree.service';
import { User } from '../user.model';
import { Tree } from '../tree.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FruitTreeService]
})

export class LoginComponent implements OnInit {
  currentUser;


  constructor(private fruitTreeService: FruitTreeService) { }

  ngOnInit() {
  }

  submitLoginForm(loginName: string) {
    //this.currentUser = loginName;
    console.log("submit login form "+loginName);
    // ???? I cant do this ??Verify login name is in DB
    this.currentUser = this.fruitTreeService.getUserByName(loginName);
    // this.fruitTreeService.getUserByName(loginName).subscribe(dataLastEmittedFromObserver => {
    //   this.currentUser = new User(dataLastEmittedFromObserver.username)
    // })
    console.log("Looked in firebase for user: "+this.currentUser.username);
    //set new session loginName in DB if found
    this.fruitTreeService.createNewSession(loginName);
  }

// New  User
  submitNewUserForm(username: string) {
    // create new user and add to DB
    var newUser: User = new User(username);
    this.fruitTreeService.addUser(newUser);
    console.log("Submit new userform "+username);
    // add to session
    this.currentUser = newUser;
    this.fruitTreeService.createNewSession(newUser);
  }

  submitLogout(username: string) {
    console.log("Logging out"+username);
    this.currentUser = '';
    //need to have
    this.fruitTreeService.logoutSession(username);
  }


}
// //---------------------
// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css'],
//   providers: [FruitTreeService]
// })
//
// export class UserProfileComponent  implements OnInit {
//   currentUser;
//
//   constructor(private route: ActivatedRoute,
//               private fruitTreeService: FruitTreeService) {
//   }
//
//   // use subscribe
//   ngOnInit() {
//     this.route.params.forEach((urlParameters) => {
//       // this.userId = urlParameters['id'];
//     });
//     this.currentUser = this.fruitTreeService.getCurrentUser();
//     console.log ("IN USER PROFILE "+this.currentUser);
//     // this.fruitTreeService.getUserById(this.albumId).subscribe(dataLastEmittedFromObserver => {
//     // this.userToDisplay = new Album(dataLastEmittedFromObserver.title,
//     //                                   dataLastEmittedFromObserver.artist,
//     //                                   dataLastEmittedFromObserver.description)
//   // })
//   }
//
// }
