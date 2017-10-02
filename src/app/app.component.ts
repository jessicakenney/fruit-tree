import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  trees: FirebaseListObservable<any[]>;
  latitude: number = 1;
  longitude: number = 1;

  constructor(private database: AngularFireDatabase){

  }

  ngOnInit(){
    this.trees = this.database.list('trees');
    this.convertAddressToPin("400", "SW 6th Ave", "97204", this.latitude, this.longitude);
  }

  convertAddressToPin(number, street, zip, latitude, longitude) {
    // debugger;
    let request = new XMLHttpRequest();
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+number+' '+street+' '+zip+'&key=AIzaSyBmEfAFGu4YQ0uBxjJDPRxa98w5RTCmkKg';

    request.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        console.log(latitude);
        console.log(longitude);
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;
        // setLatLng(response);
      }
    }


    request.open("GET", url, true);
    request.send();

    // let setLatLng = function(response){
    //   lat = response.results[0].geometry.location.lat;
    //   lng = response.results[0].geometry.location.lng;
    //
    // }

  }



}
