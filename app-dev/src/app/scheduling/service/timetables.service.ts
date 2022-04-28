import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ResponseModel} from "../../shared/models/response.model";
import {AppointmentHoursModel} from "../../shared/models/appointment-hours.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TimetablesService {

  private url = `${environment.api}/api`;

  constructor(
    private http: HttpClient,
  ) { }

  getOnlineHours(dataRef: string): Observable<ResponseModel<AppointmentHoursModel[]>> {
    return this.http.get<any>(this.url + '/surgery-appointments/get-online-timetables/' + dataRef).pipe(
      map(response => {
        response.data.forEach(hour => {
          hour.schedule = hour.schedule.substring(5, 0);
        });
        return response;
      })
    );
  }

  saveOnlineScheduling(payload) {
    const uri = `${this.url}/surgery-appointments/${payload.code}/schedule-online-appointment`;
    return this.http.post<ResponseModel<any>>(uri, payload);
  }

  getFaceToFaceHours(typeProfile: string, dateRef: string, profileCode: string): Observable<ResponseModel<AppointmentHoursModel[]>> {
    return this.http.get<any>(this.url + `/${typeProfile}/${profileCode}/available-timetables/${dateRef}`).pipe(
      map(response => {
        response.data.forEach(hour => {
          hour.schedule = hour.schedule.substring(5, 0);
        });
        return response;
      })
    );
  }

  getSurgeryHours(dateRef: string, profileCode: string) {
    return this.http.get<any>(this.url + `/hospitals/${profileCode}/available-timetables/${dateRef}`).pipe(
      map(response => {
        response.data.forEach(hour => {
          hour.schedule = hour.schedule.substring(5, 0);
        });
        return response;
      })
    );
  }
}
