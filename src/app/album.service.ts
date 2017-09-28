import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()

export class AlbumService {
  albums: FirebaseListObservable<any[]>;
  cartAlbums: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
    this.cartAlbums = database.list('cart');
  }

  getAlbums() {
   return this.albums;
  }

  getCartAlbums() {
   return this.cartAlbums;
  }

  addAlbum(newAlbum: Album) {
   this.albums.push(newAlbum);
  }

 addAlbumToCart(newCartAlbum: Album) {
  this.cartAlbums.push(newCartAlbum);
 }

  getAlbumById(albumId: string){
    return this.database.object('albums/' + albumId);
  }

  updateAlbum(localUpdatedAlbum){
    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description});
  }

  deleteAlbum(AlbumToDelete){
    var albumEntryInFirebase = this.getAlbumById(AlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }

}
