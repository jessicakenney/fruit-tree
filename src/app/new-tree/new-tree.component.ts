import { Component, OnInit } from '@angular/core';
import { Tree } from '../tree.model';
import { TreeService } from '../tree.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css'],
  providers: [TreeService]
})


export class NewTreeComponent implements OnInit {
  uid: string = null;

  constructor(private router: Router, private route : ActivatedRoute,private treeService: TreeService, private database: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
       this.uid = urlParameters['uid'];
    });
  }

  submitTreeForm(type: string, species: string, street: string, zip: string, notes: string, image: string, ownerUsername: string){
    var newTree: Tree = new Tree (type, species, street, zip, notes, image, this.uid);
    console.log(newTree);
    this.treeService.addTree(newTree);
    this.router.navigate([`/users/${this.uid}`]);
  }

}
