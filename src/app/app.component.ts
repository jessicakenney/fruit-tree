import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Fruit Forward';
}

// import { Component, OnInit, Output } from '@angular/core';
// import { FruitTreeService } from './fruit-tree.service';
// import { User } from './user.model';
// import { Tree } from './tree.model';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [FruitTreeService]
// })
//
//
// export class AppComponent implements OnInit {
//   title = 'Share the Harvest';
//   @Output() currentUser: string;
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
//     console.log(this.currentUser);
//   }
//
//   submitLoginForm(loginname: string) {
//     this.currentUser = loginname;
//     console.log(this.currentUser);
//     //need to verify login nameis on DB
//   }
//
// }
