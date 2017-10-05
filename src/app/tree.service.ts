import { Injectable } from '@angular/core';
import { Tree } from './tree.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TreeService {
  trees: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
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
        console.log(url);
        treeAddressQueries.push(url);
      })
    // console.log(inputArray.map(tree => tree.street));


      // let pickles = [];
      // inputArray.forEach(function(e) {
      //   pickles.push(e.street);
      // })
      // console.log(pickles);
      console.log("Hi" + treeAddressQueries);



      console.log(treeAddressQueries);
      for(let i in treeAddressQueries){
        console.log("Loading >>>> " + treeAddressQueries[i]);
        this.getLatAndLng(treeAddressQueries[i], coordinateArray);
      }

    });





  }

  getLatAndLng( url, coordinateArray ){
    let request = new XMLHttpRequest();
    let output = [];

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let latitude = response.results[0].geometry.location.lat;
        let longitude = response.results[0].geometry.location.lng;
        output.push([latitude, longitude]);
        coordinateArray.push([latitude, longitude]);
        console.log(output);
      }
    };

    request.open("GET", url, true);
    request.send();
  }



}
