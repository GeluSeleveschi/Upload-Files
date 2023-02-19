import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(route) {
    return this.http.get(`${environment.serverUrl}/${route}`);
  }

  public addUser(route, user) {
    return this.http.post(`${environment.serverUrl}/${route}`, user);
  }
}
