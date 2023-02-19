import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() selectedUser: User;
  @Input() photo: any;
  @Input() file: any;

  constructor() { }

  ngOnInit() { }

  public createImgPath = (serverPath: string) => {
    if (serverPath != null && serverPath != undefined) {
      return `https://localhost:5001/${serverPath}`;
    }
  }
}
