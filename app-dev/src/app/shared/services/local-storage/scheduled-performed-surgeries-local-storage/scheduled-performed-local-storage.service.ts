import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import {from, Observable} from "rxjs";
import {StoreKeyEnum} from "../../../enums/store-key.enum";
import {SurgeryAppointmentResponseModel} from "../../../models/surgery-appointments/surgery-appointment-response.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScheduledPerformedLocalStorageService {

  constructor() { }

  setSurgery(surgeryAppointment: any): Observable<any> {
    return from(
      Storage.set({
        key: StoreKeyEnum.surgeryAppointment,
        value: JSON.stringify(surgeryAppointment),
      })
    );
  }

  removeSurgery(): Observable<any> {
    return from(
      Storage.remove({
        key: StoreKeyEnum.surgeryAppointment
      })
    );
  }

  getSurgery(): Observable<SurgeryAppointmentResponseModel> {
    return from(
      Storage.get({ key: StoreKeyEnum.surgeryAppointment })
    ).pipe(
      map(obj => JSON.parse(obj.value))
    );
  }
}
