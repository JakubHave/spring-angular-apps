import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {

  content = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserSite().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
