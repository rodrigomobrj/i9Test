import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}`;

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}/api/users/${userId}`);
  }

  recoveryPassword(username: string, password: string, pinCode: string) {
    return this.http.post(this.url + '/recovery-password', {username, password, pinCode});
  }
}
