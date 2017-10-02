import { Component, OnInit } from '@angular/core';
import { FruitTreeService } from '../fruit-tree.service';
import { User } from '../user.model';
import { Tree } from '../tree.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [FruitTreeService]
})


export class AdminComponent implements OnInit {

  constructor(private fruitTreeService: FruitTreeService) { }

  ngOnInit() {
  }

//login Form takes in UserName
  submitNewUserForm(username: string) {
    var newUser: User = new User(username);
    this.fruitTreeService.addUser(newUser);
  }

}
