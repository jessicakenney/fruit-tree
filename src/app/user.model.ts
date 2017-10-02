import { Tree } from './tree.model';
export class User {
  public myTrees: Tree[];
  public followedTrees: Tree[];
  constructor (public username: string) { }
}
