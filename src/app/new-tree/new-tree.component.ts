import { Component, OnInit } from '@angular/core';
import { Tree } from '../tree.model';
import { TreeService } from '../tree.service';

@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css'],
  providers: [TreeService]
})
export class NewTreeComponent implements OnInit {

  constructor(private treeService: TreeService) { }

  ngOnInit() {
  }

  submitTreeForm(type: string, species: string, street: string, zip: string, notes: string, image: string, ownerUsername: string){
    var newTree: Tree = new Tree (type, species, street, zip, notes, image, ownerUsername);
    this.treeService.addTree(newTree);
    console.log(newTree);
}
}
