import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Tree } from '../tree.model';
import { User } from '../user.model';
import { FruitTreeService } from '../fruit-tree.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FruitTreeService]
})

export class UserProfileComponent  implements OnInit {
  uid: string = null;
  userKey: string;
  userToDisplay : FirebaseObjectObservable<any[]>;

  constructor(private route: ActivatedRoute,
              private fruitTreeService: FruitTreeService, private location: Location, private database: AngularFireDatabase,private auth: AngularFireAuth, private router: Router) {
  }

  // use subscribe ?
  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
       this.uid = urlParameters['uid'];
    });
    this.database.database.ref("users").orderByChild("uid").equalTo(this.uid).on("child_added",(snapshot) => {
    this.userKey = snapshot.key;
    this.userToDisplay = this.fruitTreeService.getUserByKey(this.userKey);
  })
 }

 submitLogout() {
   console.log("Logging out currentUser : ");
   this.auth.auth.signOut();
   //redirect to home page?
   this.router.navigate(['']);
 }

}
