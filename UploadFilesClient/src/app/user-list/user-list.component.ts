import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../file.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name'];
  selectedUser: User;
  image: any = '/assets/test.jpg'
  users: User[];
  profilePhoto: any;
  file: any;
  photos: any[];

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private fileService: FileService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.userService.getUsers('api/users').subscribe(response => {
      this.users = response as User[];
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSelectedUser(user: User) {
    this.selectedUser = user;
    this.getProfilePhoto();
    this.getFile();
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath != null && serverPath != undefined) {
      return `https://localhost:5001/${serverPath}`;
    }
  }

  getProfilePhoto = () => {
    this.fileService.getFile(this.selectedUser?.imgPath).subscribe(data => this.profilePhoto = data['file']);
  }

  getFile = () => {
    this.fileService.getFile(this.selectedUser?.filePath).subscribe(data => this.file = data['file']);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
