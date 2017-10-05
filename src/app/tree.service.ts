import { Injectable } from '@angular/core';
import { Tree } from './tree.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TreeService {
  trees: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.trees = database.list('trees');
  }

  getTrees(){
    return this.trees;
  }

  addTree(newTree: Tree) {
    this.trees.push(newTree);
    //also add Tree to User myTrees
  }



  getTreeCoordinates(coordinateArray){
    let treeAddressQueries = [];

    this.trees.subscribe( (inputArray) =>{
      let output = [];
      inputArray.forEach(function(tree) {
        let street = tree.street;
        let zip = tree.zip;
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+street+' '+zip+'&key=AIzaSyBmEfAFGu4YQ0uBxjJDPRxa98w5RTCmkKg';
        let type = tree.type
        treeAddressQueries.push([type ,url]);
      })

      for(let i in treeAddressQueries){
        this.getLatAndLng(treeAddressQueries[i][0], treeAddressQueries[i][1], coordinateArray);
      }

    });





  }

  getLatAndLng( type, url, coordinateArray ){
    let request = new XMLHttpRequest();
    let output = [];

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let latitude = response.results[0].geometry.location.lat;
        let longitude = response.results[0].geometry.location.lng;
        output.push([latitude, longitude]);
        coordinateArray.push([type, latitude, longitude]);
      }
    };

    request.open("GET", url, true);
    request.send();
  }

  getPublicTrees(){
    let publicTrees: FirebaseListObservable<any[]>;
    let ref = this.database.database.ref("trees").orderByChild("userId").equalTo("public");
    ref.once("value",(snapshot) => {
           snapshot.forEach((item) => {
               var itemVal = item.val();
               console.log("Test "+itemVal.type);
               publicTrees.push(itemVal);
               //this is to fix some typescript compiler bug while
               //foreach loop with snapshot
               return false;
           });
          console.log("trees by user "+ publicTrees[0].type);
          // for (let i=0; i < trees.length; i++) {
          //   this.myTrees.push(trees[i]);
          // }
    });
    return publicTrees;
  }

}
