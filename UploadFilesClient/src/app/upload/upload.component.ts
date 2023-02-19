import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();
  @Output() sendPhotoEvent = new EventEmitter<any>();
  @Output() isValidImageEvent = new EventEmitter<boolean>();
  @Output() sendFileEvent = new EventEmitter<any>();
  photo: any;
  file: any;
  fileName: string;
  photoName: string;
  constructor() { }

  ngOnInit(): void {
  }

  uploadPhoto = (files) => {
    let file = files[0];
    let isValidImage = file.type.startsWith('image/');
    this.isValidImageEvent.emit(isValidImage);
    this.photo = file;
    this.sendPhotoEvent.emit(this.photo);
    this.photoName = file.name;
  }

  onFileChange(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.sendFileEvent.emit(this.file);
  }

}
