import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';
import { HospitalScheduling } from '../models/hospital-scheduling.model';
import {HospitalSearchModel} from "../models/hospital-search.model";

@Injectable({
  providedIn: 'root'
})
export class SchedulingSurgeryService {

  private url = `${environment.api}/api`;

  constructor(
    private http: HttpClient) { }

  searchHospitalsForSurgeon(hospitalSearch: HospitalSearchModel) : Observable<ResponseModel<HospitalScheduling[]>>  {
    const endPoint = `${this.url}/surgeons/${hospitalSearch.surgeonCode}/get-available-hospitals?dateRef=${hospitalSearch.dateRef}&timetableCode=${hospitalSearch.timetableCode}&hospitalName=${hospitalSearch.hospitalName}&bestRating=${hospitalSearch.bestRating}`;
    return this.http.get<ResponseModel<HospitalScheduling[]>>(endPoint);
  }

  getHospitalCode(hospitalCode): Observable<ResponseModel<HospitalScheduling[]>> {
    const endPoint = `${this.url}/hospitals/${hospitalCode}/available-timetables/dateRef`;
    return this.http.get<ResponseModel<HospitalScheduling[]>>(endPoint);
  }

  getSurgeryTime(surgeonCode, date) : Observable<ResponseModel<HospitalScheduling[]>> {
    const endPoint = `${this.url}/surgeons/${surgeonCode}/available-timetables/${date}`;
    return this.http.get<ResponseModel<HospitalScheduling[]>>(endPoint);
  }

  surgeryScheduling(surgeryScheduling: any): Observable<any> {
    const uri = this.url + `/surgery-appointments/${surgeryScheduling.code}/schedule-surgery`;
    delete surgeryScheduling.code;
    return this.http.post<any>(uri, surgeryScheduling);
  }

}
