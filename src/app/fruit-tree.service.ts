import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class FruitTreeService {
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
    this.users = database.list('users');
  //  this.currentUser = database.object('currentUser');
  }

  addUser(newUser: User) {
   this.users.push(newUser).then(_ => console.log("FB pushed new user"));
  }

  getUserByKey(key: string){
    console.log("Service  >> looking for  user by key : "+key);
    return this.database.object('users/' + key);
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

}
