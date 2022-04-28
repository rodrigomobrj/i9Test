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
export class SurgeonTimetablesService {

  private url = `${environment.api}/api/surgeon-timetables/available`;

  constructor(
    private http: HttpClient,
  ) { }

  getHours(dateRef: string): Observable<ResponseModel<AppointmentHoursModel[]>> {
    return this.http.post<any>(this.url, {dateRef}).pipe(
      map(response => {
        response.data.forEach(hour => {
          hour.schedule = hour.schedule.substring(5, 0);
        });
        return response;
      })
    );
  }
}
