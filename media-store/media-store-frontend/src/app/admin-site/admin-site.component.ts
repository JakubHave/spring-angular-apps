import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {

  content = '';
  allUsers = new Array<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminSite().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.userService.getAllUsers().subscribe(
      res => {
        this.allUsers = res;
        console.log(res);
      }
    );
  }

  removeUser(user: User) {
    this.userService.removeUser(user).subscribe(
      res => {
        this.allUsers = this.allUsers.filter(item => item.name !== user.name);
      }, err => {
        console.log(err);
      }
    );
  }
}
