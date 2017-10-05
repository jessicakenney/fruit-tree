import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Tree } from '../tree.model';
import { User } from '../user.model';
import { FruitTreeService } from '../fruit-tree.service';
import { FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
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
  myTrees : FirebaseListObservable<any[]>;

  constructor(private route: ActivatedRoute,
              private fruitTreeService: FruitTreeService, private location: Location, private database: AngularFireDatabase,private auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    //Grab user id from URL
    this.route.params.forEach((urlParameters) => {
       this.uid = urlParameters['uid'];
    });
    //from uid -> key -> User
    this.database.database.ref("users").orderByChild("uid").equalTo(this.uid).on("child_added",(snapshot) => {
      this.userKey = snapshot.key;
      this.userToDisplay = this.fruitTreeService.getUserByKey(this.userKey);
    })

    //to get the user's trees, do a search in the trees with this.uid
    let trees = [];
    let ref = this.database.database.ref("trees").orderByChild("userId").equalTo(this.uid);
    ref.once("value",(snapshot) => {
           snapshot.forEach((item) => {
               var itemVal = item.val();
               console.log("Test "+itemVal.type);
               trees.push(itemVal);
               //this is to fix some typescript compiler bug while
               //foreach loop with snapshot
               return false;
           });
          // console.log("trees by user "+ trees[0].type);
          this.setTrees(trees);
    })

  }

 submitLogout() {
   console.log("Logging out currentUser : ");
   this.auth.auth.signOut();
   //redirect to home page?
   this.router.navigate(['']);
 }

 setTrees(treeList){
   this.myTrees = treeList;
 }

}
