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
    // this.trees = database.list('trees');
    // this.cartAlbums = database.list('cart');
  }

 //  getAlbums() {
 //   return this.albums;
 //  }
 //
 //  getCartAlbums() {
 //   return this.cartAlbums;
 //  }
 //
  addUser(newUser: User) {
   this.users.push(newUser).then(_ => console.log("FB pushed new user"));
  }

  createNewSession(username) {
    console.log("Service:createNewSession "+username);
    this.currentUser.set(username).then(_ => console.log("FB set currentUser"));
  }

  logoutSession(username) {
    console.log("Service:logging out "+username);
    this.currentUser.remove().then(_ => console.log("FB removed currentUser"));
  }

  getCurrentUser() {
    return this.currentUser;
  }


  getUserByName(name: string){
    let queryRef = this.database.list("users/", { query: { orderByChild: 'username', equalTo: name } });
    //var queryRef = this.database.database.ref("users").orderByChild("username").equalTo(name)
    console.log("GetUserBy Name: fb "+queryRef);
    return queryRef;
    // .on("value", function(snapshot) {
    //   console.log ("snapshot:" + snapshot.key);
    //   return snapshot.key;
    // });
    //var temp = this.database.database.ref('users').orderByKey().equalTo("bob");
    //console.log("GetUserBy Name: fb "+temp);
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
