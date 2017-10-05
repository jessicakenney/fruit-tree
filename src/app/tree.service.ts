import { Injectable } from '@angular/core';
import { Tree } from './tree.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TreeService {
  trees: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    console.log("inside you");
    this.trees = database.list('trees');
  }

  getTrees(){
    return this.trees;
  }

  addTree(newTree: Tree) {
    this.trees.push(newTree);
  }

  getTreeCoordinates(coordinateArray){
    let treeAddressQueries = [];

    this.trees.subscribe( (inputArray) =>{
      let output = [];
      inputArray.forEach(function(tree) {
        let street = tree.street;
        let zip = tree.zip;
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+street+' '+zip+'&key=AIzaSyBmEfAFGu4YQ0uBxjJDPRxa98w5RTCmkKg';
        let species = tree.species
        treeAddressQueries.push([species ,url]);
      })

      for(let i in treeAddressQueries){
        this.getLatAndLng(treeAddressQueries[i][0], treeAddressQueries[i][1], coordinateArray);
      }

    });





  }

  getLatAndLng( species, url, coordinateArray ){
    let request = new XMLHttpRequest();
    let output = [];

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let latitude = response.results[0].geometry.location.lat;
        let longitude = response.results[0].geometry.location.lng;
        output.push([latitude, longitude]);
        coordinateArray.push([species, latitude, longitude]);
      }
    };

    request.open("GET", url, true);
    request.send();
  }



}
