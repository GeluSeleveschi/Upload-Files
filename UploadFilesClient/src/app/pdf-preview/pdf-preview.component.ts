import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.css']
})
export class PdfPreviewComponent {
  @Input() pdfSrc: string;
}
