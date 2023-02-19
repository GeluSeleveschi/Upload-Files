import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileService } from '../file.service';
import { FileTypeValidator } from '../fileType-validator';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  users: User[] = [];
  isValidImage: boolean;
  file: any;
  photo: any;
  response: { dbPath: '' };

  constructor(private fb: FormBuilder, private userService: UserService,
    private fileService: FileService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  createForm = () => {
    this.userForm = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      imgPath: new FormControl(null, [Validators.required, FileTypeValidator.validate]),
      filePath: new FormControl(null, [Validators.required])
    })
  }

  submit(currentUser) {
    if (!this.userForm.valid) return;

    const userModel = { ...currentUser, ...this.user };
    userModel.imgPath = this.photo.name;
    this.userService.addUser('api/users', userModel).subscribe({
      next: (resp: User) => {
        this.uploadFile(resp);
        this.router.navigate(['/']);
      }
    });
  }

  uploadFinished(event) {
    this.response = event;
  }

  getUsers() {
    this.userService.getUsers('api/users').subscribe({
      next: (res) => this.users = res as User[],
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  createImgPath(serverPath) {
    return `${environment.serverUrl}/${serverPath}`;
  }

  getFiles(event) {
    this.photo = event;
    this.userForm.controls.imgPath.patchValue(this.photo.name);
  }

  validateControl = (controlName: string) => {
    if (this.userForm.get(controlName).invalid && this.userForm.get(controlName).touched)
      return true;

    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.userForm.get(controlName).hasError(errorName))
      return true;

    return false;
  }

  getFile(event) {
    this.file = event;
    this.userForm.controls.filePath.patchValue(this.file.name);
  }

  uploadFile(user: User) {
    const formData = new FormData();
    let files = [this.file, this.photo];

    for (const file of files) {
      formData.append('files', file, `${user.id}~${file.name}`);
    }

    this.fileService.uploadFile(formData).subscribe();
  }

}
