import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../file.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  file: File;
  pdfUrl: any;
  showSpinner: boolean = true;
  constructor(private sanitizer: DomSanitizer, private fileService: FileService) { }

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  preview() {
    this.showSpinner = true;
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.fileService.previewFile(formData).subscribe((pdfBlob) => {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))
      this.showSpinner = false;
    });
  }
}

