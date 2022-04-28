import { Observable } from 'rxjs';
import { Surgerie } from '../../../new-surgery/models/surgerie.model';
import { ResponseListModel } from '../../models/ResponseList.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ResponseModel} from "../../models/response.model";
import {SurgeryDetailModel} from "../../../new-surgery/models/surgery-detail.model";

@Injectable({
  providedIn: 'root'
})
export class SurgeriesService {

  private url = `${environment.api}/api/surgeries`;
  constructor(
    private http: HttpClient
  ) { }

  getAllSurgeries() : Observable<ResponseModel<ResponseListModel<Surgerie[]>>>{
    return this.http.get<ResponseModel<ResponseListModel<Surgerie[]>>>(this.url);
  }

  getAllSurgeriesByName(name: string) : Observable<ResponseModel<ResponseListModel<Surgerie[]>>>{
    return this.http.get<ResponseModel<ResponseListModel<Surgerie[]>>>(this.url + '?name=' + name);
  }

  getSurgeryDetailById(code : string): Observable<ResponseModel<SurgeryDetailModel[]>> {
    const urlParams = `${this.url}/${code}/details`;
    return this.http.get<ResponseModel<SurgeryDetailModel[]>>(urlParams);
  }

  getSurgeryById(code : string): Observable<ResponseModel<any>> {
    const urlParams = `${this.url}/${code}`;
    return this.http.get<ResponseModel<any>>(urlParams);
  }

}
