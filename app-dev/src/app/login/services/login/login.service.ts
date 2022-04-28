import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationModel} from "../../models/authentication.model";
import {ResponseModel} from "../../../shared/models/response.model";
import {AuthenticationService} from "../../../core/services/authentication/authentication.service";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.api}/authorize`;
  inspirationDate: EventEmitter<Date> = new EventEmitter<Date>();


  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) { }

  authentication(username: string, password: string): Observable<ResponseModel<AuthenticationModel>> {
    const authentication = {username, password};
    return this.http.post<ResponseModel<AuthenticationModel>>(this.url, authentication);
  }

  logout(): Observable<any> {
    return this.authenticationService.deleteInspirationDate().pipe(
      mergeMap(() => this.authenticationService.deleteToken())
    );
  }

  setInspirationDate(inspirationDate: string) {
    this.inspirationDate.emit(
      new Date(inspirationDate)
    );
  }
}
