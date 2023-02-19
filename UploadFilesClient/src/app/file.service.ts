import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public uploadFiles(route, formData) {
    return this.http.post(`${environment.serverUrl}/${route}`, formData, { reportProgress: true, observe: 'events' });
  }

  public getFile(fileName) {
    return this.http.get(`${environment.serverUrl}/api/file/getFile/${fileName}`);
  }

  public download(fileUrl: string) {
    return this.http.get(`${environment.serverUrl}/api/file/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public uploadFile(files: any) {
    return this.http.post(`${environment.serverUrl}/api/file/upload/file`, files);
  }

  public previewFile(file) {
    return this.http.post(`${environment.serverUrl}/api/file/preview`, file, { responseType: 'blob' });
  }

}
