import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {

  content = '';

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
  }
}
