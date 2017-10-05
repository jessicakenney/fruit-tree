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
  currentRoute: string = this.router.url;

  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log("currentRoute "+this.currentRoute);
  }


}
