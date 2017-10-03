// import { Component, OnInit, Output } from '@angular/core';
// import { FruitTreeService } from '../fruit-tree.service';
// import { User } from '../user.model';
// import { Tree } from '../tree.model';
//
// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css'],
//   providers: [FruitTreeService]
// })
//
//
// export class AdminComponent implements OnInit {
//   @Output() currentUser: string = '';
//
//
//   constructor(private fruitTreeService: FruitTreeService) { }
//
//   ngOnInit() {
//   }
//
// //login Form takes in UserName
//   submitNewUserForm(username: string) {
//     var newUser: User = new User(username);
//     this.fruitTreeService.addUser(newUser);
//     this.currentUser = username;
//     console.log("Submit new userform "+this.currentUser);
//     this.fruitTreeService.createNewSession(newUser);
//   }
//
//   submitLoginForm(loginname: string) {
//     this.currentUser = loginname;
//     console.log("submit login form "+this.currentUser);
//     this.fruitTreeService.createNewSession(loginname);
//     //need to verify login nameis on DB
//   }
//
// }
