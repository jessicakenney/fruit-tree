import { Component, OnInit } from '@angular/core';
import { Tree } from '../tree.model';
import { TreeService } from '../tree.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css'],
  providers: [TreeService]
})
export class NewTreeComponent implements OnInit {
  userId: string = null;

  constructor(private route : ActivatedRoute,private treeService: TreeService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['uid'];
    });
    console.log("newtree uid url >> "+this.userId)
  }


  submitTreeForm(type: string, species: string, street: string, zip: string, notes: string, image: string, ownerUsername: string){
    var newTree: Tree = new Tree (type, species, street, zip, notes, image, this.userId);
    this.treeService.addTree(newTree);
    console.log(newTree);
}
}
