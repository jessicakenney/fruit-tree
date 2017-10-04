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
  }
