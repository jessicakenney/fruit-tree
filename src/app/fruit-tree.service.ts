import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class FruitTreeService {
  users: FirebaseListObservable<any[]>;
  currentUser: FirebaseObjectObservable<any[]>;

  constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
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
   console.log("newUser Key "+newPostKey);

   var updateUid = {};
   updateUid ['/users/' + newPostKey] = { username : newUser.username, uid : newPostKey};
   this.database.database.ref().update(updateUid).then(_ => console.log("FB update"))
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
    let queryRef;
    queryRef = this.database.database.ref("users").orderByChild("username").equalTo(name).once('value', function(snapshot) {
      console.log(snapshot.val());
      console.log("snapshot uid" + snapshot.val().uid);
      return  snapshot.val() ;
    })
  }

  newSignIn(email, password){
    this.auth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      //put in some alerts here or something
      // var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      // if (errorCode === 'auth/wrong-password') {
      //   alert('Wrong password.');
      // } else {
      //   alert(errorMessage);
      // }
      alert(errorMessage);
      console.log(error);
      console.log("newSignIn: Problems with your email or password...but keep smiling:)")
    });
  }

  signIn(email,password){
    this.auth.auth.signInWithEmailAndPassword(email,password).catch(function(error) {
      // Handle Errors here.
      //not finding code  var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
      });
  }



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
