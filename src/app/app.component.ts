import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Fruit Forward';

  // currentUser = this.auth.auth.currentUser;
  lat: number = 45.519959;
  lng: number = -122.677037;

  currentRoute: string = this.router.url;


  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log("currentRoute "+this.currentRoute);
  }


}
