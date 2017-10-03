import { Component, OnInit, Output } from '@angular/core';
import { FruitTreeService } from '../fruit-tree.service';
import { User } from '../user.model';
import { Tree } from '../tree.model';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FruitTreeService]
})

export class LoginComponent implements OnInit {
  //currentUserId: FirebaseObjectObservable<any[]>;
  currentUserId;
  currentUser;

  constructor(private fruitTreeService: FruitTreeService) { }

  ngOnInit() {
  }

  submitLoginForm(loginName: string) {
    console.log("submit login form "+loginName);
    this.currentUserId= this.fruitTreeService.getUserByName(loginName);
    console.log("login userId "+this.currentUserId);
  }

// New  User
  submitNewUserForm(username: string) {
    // create new user and add to DB
    var newUser: User = new User(username,'');
    this.fruitTreeService.addUser(newUser);
    console.log("Submit new userform "+username);
    // add to session
    this.currentUser = newUser;
    //this.fruitTreeService.createNewSession(newUser);
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
