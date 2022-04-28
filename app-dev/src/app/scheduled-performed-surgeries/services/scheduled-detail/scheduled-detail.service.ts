import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../../shared/models/response.model";
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduledDetailService {

  private url = `${environment.api}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getScheduledDetail(code: string): Observable<ResponseModel<SurgeryAppointmentResponseModel>> {
    const endPoint = `${this.url}/medical-record/`
    return this.http.get<any>(endPoint + code);
  }

  getDownloadFile(code: string): Observable<ResponseModel<any>> {
    const endPoint: string = `${this.url}/patient-surgery-attachment/${code}/download`;
    return this.http.get<any>(endPoint);
  }
}
