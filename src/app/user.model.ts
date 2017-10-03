import { Tree } from './tree.model';
export class User {
  public myTrees: Tree[];
  public favoriteTrees: Tree[];
  constructor (public username: string, public uid: string) { }
}
