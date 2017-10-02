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
   this.users.push(newUser);
  }

  createNewSession(username) {
    console.log("SERVICE "+username);
    this.currentUser.set(username).then(_ => console.log("FB set"));
  }
   getCurrentUser() {
    return this.currentUser;
   }


 //
 // addAlbumToCart(newCartAlbum: Album) {
 //  this.cartAlbums.push(newCartAlbum);
 // }
 //
 //  getAlbumById(albumId: string){
 //    return this.database.object('albums/' + albumId);
 //  }
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
