import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserInfoResponseModel} from "../../model/user-info-response.model";
import {ResponseModel} from "../../../shared/models/response.model";
import {map} from "rxjs/operators";
import {parseDateToFrontUtil} from "../../../shared/utils/parseDateToBackUtil";
import {UserInfoRequestModel} from "../../model/user-info-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private url = `${environment.api}/api/user-info`

  constructor(
    private http: HttpClient,
  ) { }

  getUserInfo(): Observable<ResponseModel<UserInfoResponseModel>> {
    return this.http.get<ResponseModel<UserInfoResponseModel>>(this.url).pipe(
      map(this.parseData)
    );
  }

  private parseData(response: ResponseModel<UserInfoResponseModel>) {
    if (response.data.birthDate) {
      response.data.birthDate = parseDateToFrontUtil(response.data.birthDate);
    }
    if (response.data.height) {
      response.data.height = response.data.height.replace('.', '');
    }
    if (response.data.weight) {
      response.data.weight = response.data.weight.replace('.', '');
    }
    return response;
  }

  createUserInfo(userInfo: UserInfoRequestModel): Observable<any> {
    return this.http.post(this.url, userInfo);
  }

  updateUserInfo(userInfo: UserInfoRequestModel) {
    return this.http.patch(this.url, userInfo);
  }
}
