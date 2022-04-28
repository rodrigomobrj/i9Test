import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {Storage} from "@capacitor/storage";
import {StoreKeyEnum} from "../../../shared/enums/store-key.enum";
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScheduledDetailStorageService {

  setSurgery(surgeryAppointment: any): Observable<any> {
    return from(
      Storage.set({
        key: StoreKeyEnum.surgeryAppointmentDetail,
        value: JSON.stringify(surgeryAppointment),
      })
    );
  }

  getSurgery(): Observable<SurgeryAppointmentResponseModel> {
    return from(
      Storage.get({ key: StoreKeyEnum.surgeryAppointmentDetail })
    ).pipe(
      map(obj => JSON.parse(obj.value))
    );
  }
}
