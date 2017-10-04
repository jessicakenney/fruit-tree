import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Tree } from '../tree.model';
import { User } from '../user.model';
import { FruitTreeService } from '../fruit-tree.service';
import { FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FruitTreeService]
})

export class UserProfileComponent  implements OnInit {
  uid: string = null;
  userToDisplay;

  constructor(private route: ActivatedRoute,
              private fruitTreeService: FruitTreeService, private location: Location) {
  }

  // use subscribe
  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
       this.uid = urlParameters['uid'];
    });
    //this.userToDisplay = this.fruitTreeService.getUserById(this.uid);
    //try use subscribe
    this.fruitTreeService.getUserById(this.uid).subscribe(dataLastEmittedFromObserver => {
    this.userToDisplay = new User (dataLastEmittedFromObserver.uid,dataLastEmittedFromObserver.email);
    console.log(this.userToDisplay);
  })
}
}

// export class User {
//   public uid: string;
//   public myTrees: Tree[];
//   public favoriteTrees: Tree[];
//   constructor (public email: string) { }
// }
