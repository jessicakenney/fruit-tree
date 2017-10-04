import { Tree } from './tree.model';
export class User {
  public uid: string;
  public myTrees: Tree[];
  public favoriteTrees: Tree[];
  constructor (public email: string) { }
}
