import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResponseModel} from "../../../shared/models/response.model";
import {AppointmentHoursModel} from "../../../shared/models/appointment-hours.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FaceToFaceSchedulingModel} from "../../../scheduling/model/face-to-face-scheduling.model";

@Injectable({
  providedIn: 'root'
})
export class SchedulingFaceToFaceService {

  private url = `${environment.api}/api`;

  constructor(
    private http: HttpClient,
  ) { }

  schedulingFaceToFace(faceToFaceScheduling: FaceToFaceSchedulingModel): Observable<ResponseModel<AppointmentHoursModel[]>> {
    const payload = {
      timetableCode: faceToFaceScheduling.timetableCode,
      dateRef: faceToFaceScheduling.dateRef,
    };
    if (faceToFaceScheduling.typeProfile == 'hospitals') {
      payload['hospitalCode'] = faceToFaceScheduling.profileCode;
    } else {
      payload['surgeonCode'] = faceToFaceScheduling.profileCode;
    }
    return this.http.post<any>(
      this.url + `/surgery-appointments/${faceToFaceScheduling.surgeryAppointmentCode}/schedule-timetable`,
      payload
    );
  }
}
