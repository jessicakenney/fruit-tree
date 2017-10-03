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
  currentUser;

  constructor(private route: ActivatedRoute,
              private fruitTreeService: FruitTreeService) {
  }

  // use subscribe
  ngOnInit() {
    // this.route.params.forEach((urlParameters) => {
    //   // this.userId = urlParameters['id'];
    // });
    this.currentUser = this.fruitTreeService.getCurrentUser();
    console.log ("IN USER PROFILE "+this.currentUser);
  //   this.fruitTreeService.getCurrentUser().subscribe(dataLastEmittedFromObserver => {
  //    this.currentUser = new Album(dataLastEmittedFromObserver.title,
  //                                      dataLastEmittedFromObserver.artist,
  //                                      dataLastEmittedFromObserver.description)
  //  })
  }

}
