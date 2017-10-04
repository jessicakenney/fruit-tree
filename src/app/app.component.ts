import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Fruit Forward';
  currentUser = this.auth.auth.currentUser;
  lat: number = 45.519959;
  lng: number = -122.677037

  //var user = this.auth.auth.currentUser;
  constructor(private auth: AngularFireAuth) {
  }

  ngOnInit() {
  }


}





// export class LoginComponent implements OnInit {
//   //currentUserId: FirebaseObjectObservable<any[]>;
//   currentUserId;
//   currentUser;
//
//   constructor(private fruitTreeService: FruitTreeService) { }
//
//   ngOnInit() {
//   }
//
//   submitNewUser(email: string, password: string) {
//     console.log("Submit login form "+email);
//     this.currentUser = this.fruitTreeService.newSignIn(email,password);
//   }
