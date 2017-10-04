import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { TreeService } from '../tree.service';
import { Tree } from '../tree.model';

@Component({
  selector: 'app-all-trees',
  templateUrl: './all-trees.component.html',
  styleUrls: ['./all-trees.component.css'],
  providers: [TreeService]
})
export class AllTreesComponent implements OnInit {
  trees: FirebaseListObservable<any[]>;
  treeCoordinates = [];
  constructor(private router: Router, private treeService: TreeService) { }

  ngOnInit() {
    this.trees = this.treeService.getTrees();
    this.treeService.getTreeCoordinates(this.treeCoordinates);
  }

}
