import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()

export class FruitTreeService {
  users: FirebaseListObservable<any[]>;
  currentUser: FirebaseObjectObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.users = database.list('users');
    this.currentUser = database.object('currentUser');

  }

  addUser(newUser: User) {
    //perry
    //write the record
    //get the reference to the top node "users"
    //find the record you just wrote's key
    //update the local object with they key as the id property
    //update the object in the database
    //now any time we retrieve the object, we can ignore the node. id is now property of object for forever.

   this.users.push(newUser).then(_ => console.log("FB pushed new user"));
   var newPostKey = this.database.database.ref().child('users').push().key;

   var updateUid = {};
   updateUid ['/users/' + newPostKey] = { username : newUser.username, uid : newPostKey};
   this.database.database.ref().update(updateUid)
  }

  createNewSession(userId: string) {
    console.log("Service:createNewSession "+userId);
    this.currentUser.set(userId).then(_ => console.log("FB set currentUserId"));
  }

  logoutSession(username) {
    console.log("Service:logging out "+username);
    this.currentUser.remove().then(_ => console.log("FB removed currentUser"));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUserById(userId: string){
    return this.database.object('/users/' + userId);
  }

  getUserByName(name: string){
    var queryRef = this.database.database.ref("users").orderByChild("username").equalTo(name).on("child_added",function(snapshot) {
      console.log ("snapshot:" + snapshot.key);
      // console.log(snapshot.val().username);
      //this.createNewSession(snapshot.key);
   });
   return "bob";

  }

  //  getUserByNamePromise(name: string) {
  //   return this.database.database.ref("users").orderByChild('username').equalTo(name).once('value').then(function(snapshot) {
  //     console.log ("snapshot : "+ snapshot.key);
  //     return snapshot.val();
  //   });
  // }


 //
 // addAlbumToCart(newCartAlbum: Album) {
 //  this.cartAlbums.push(newCartAlbum);
 // }
 //
 //
 //  updateAlbum(localUpdatedAlbum){
 //    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
 //    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
 //                                artist: localUpdatedAlbum.artist,
 //                                description: localUpdatedAlbum.description});
 //  }
 //
 //  deleteAlbum(AlbumToDelete){
 //    var albumEntryInFirebase = this.getAlbumById(AlbumToDelete.$key);
 //    albumEntryInFirebase.remove();
 //  }

}
