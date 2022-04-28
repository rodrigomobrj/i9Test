import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SmsResponseModel} from "../../models/smsResponse.model";

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private urlService = `${environment.api}/pin-code`;

  constructor(private http: HttpClient) { }

  sendSMSValidate(username: string): Observable<SmsResponseModel> {
    const endPoint = this.urlService + '/request';
    return this.http.post<SmsResponseModel>(endPoint, {username});
  }

  confirmCreationSms(username: string, pinCode: string): Observable<SmsResponseModel> {
    const endPoint = `${environment.api}/create/new-user/confirm`;
    return this.http.post<SmsResponseModel>(endPoint, {username, pinCode});
  }
}
