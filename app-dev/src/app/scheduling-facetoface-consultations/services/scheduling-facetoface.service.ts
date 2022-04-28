import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SurgeonOrHospital } from '../models/surgeonOrHospital.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import {searchModel} from "../models/search.model";
import {PriceRangeModel} from "../models/price-range.model";

@Injectable({
  providedIn: 'root'
})
export class SchedulingFacetofaceService {

  private url = `${environment.api}/api`
  constructor(
    private http: HttpClient
  ) { }

  getHospitalById(codeHospital: string, codeSurgery: string): Observable<ResponseModel<SurgeonOrHospital[]>> {
    const endPoint = `${this.url}/hospitals/${codeHospital}/profile/${codeSurgery}`;
    return this.http.get<ResponseModel<SurgeonOrHospital[]>>(endPoint);
  }

  getSurgeonById(codeSurgeon: string, codeSurgery: string) : Observable<ResponseModel<SurgeonOrHospital[]>> {
    const endPoint = `${this.url}/surgeons/${codeSurgeon}/profile/${codeSurgery}`
    return this.http.get<ResponseModel<SurgeonOrHospital[]>>(endPoint);
  }

  searchSurgeon(params): Observable<ResponseModel<searchModel[]>> {
    const url = this.url + '/search/surgeon';
    return this.http.get<any>(url, {params: params});
  }

  searchHospitals(params): Observable<ResponseModel<searchModel[]>> {
    const url = this.url + '/search/hospital';
    return this.http.get<any>(url, {params: params});
  }

  getPriceRange(surgeryCode: string): Observable<ResponseModel<PriceRangeModel>> {
    const url = this.url + '/search/price-range';
    return this.http.get<any>(url, {params: {surgeryCode}});
  }
}
