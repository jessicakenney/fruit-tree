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
  lat: number = 45.5545304;
  lng: number = -122.6374891;
  zoomLevel: number = 14;
  a: string = "A";
  b: string = "b";

  constructor(private router: Router, private treeService: TreeService) { }

  ngOnInit() {
    this.trees = this.treeService.getTrees();
    this.treeService.getTreeCoordinates(this.treeCoordinates);
  }

}
